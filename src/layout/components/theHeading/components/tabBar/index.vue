<script lang="ts" setup>
import { reactive, watch, watchEffect, onMounted, computed, ref, onUnmounted } from 'vue'

import { useRoute, onBeforeRouteLeave } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { Close } from '@element-plus/icons-vue'
import { router } from '@/router';
import { table } from 'console';

/*
检测路由跳转，记录路由变量，存进一个列表里面，视图循环展示即可。存入列表需要需要去重，
  
*/
const tabList = reactive<RouteLocationNormalizedLoaded[]>([]);
const currentRoute = useRoute();


onMounted(() => addTab(currentRoute));
onBeforeRouteLeave((to) => addTab(to));

function addTab(route: RouteLocationNormalizedLoaded) {
  if (tabList.some(item => item.fullPath === route.fullPath)) return;
  tabList.push({ ...route })
  // tabList.push(route) // 这样子直接推入会有bug，不知道为什么，上面那样子写就不会
}

function isCurrentTab(route: RouteLocationNormalizedLoaded) {
  if (route.fullPath === currentRoute.fullPath) return true;
  return false;
}


function closeTab(index: number) {
  // 逻辑思路，关闭当前标签，直接从数组删除即可
  // 如果关闭当前时当前激活标签，判断关闭标签后面是否有标签，有就激活后面的标签
  // 如果后面没有标签就拿前面的，如果后面和前面都没有，那么就是最后一个了，关闭了重定向到首页
  const closedTab = tabList[index];
  const nextOrPrevTab = tabList[index + 1] ? tabList[index + 1] : tabList[index - 1];
  if (isCurrentTab(closedTab)) {
    if (nextOrPrevTab) {
      router.push(nextOrPrevTab.fullPath);
    } else {
      if (closedTab.fullPath === '/dashboard') return;
      router.replace('/');
    }
  }
  tabList.splice(index, 1);
}

function closeOtherTab(route: RouteLocationNormalizedLoaded) {
  tabList.splice(0, tabList.length);
  tabList.push(route);
  router.push(route.fullPath)
}

function closeAllTab() {
  tabList.splice(0)
  router.push('/');
}

function closeLeftTab(index: number) {
  const leftSideTags = tabList.splice(0, index);
  if (leftSideTags.some(item => isCurrentTab(item))) {
    router.push(tabList[0].fullPath);
  }
}

function closeRightTab(index: number) {
  const rightSideTags = tabList.splice(index + 1);
  if (rightSideTags.some(item => isCurrentTab(item))) {
    router.push(tabList[tabList.length - 1].fullPath);
  }
}

interface CurrentActionTabType {
  index: number;
  tab: RouteLocationNormalizedLoaded;
}

const currentActionTab = reactive({} as CurrentActionTabType);

const isShowContextMenu = ref(false);
const contextMenuPosition = reactive({ top: 0, left: 0 });
const contextMenuStyle = computed(() => `top: ${contextMenuPosition.top}px;
    left: ${contextMenuPosition.left}px`);

function openContextMenu(tab: RouteLocationNormalizedLoaded, index: number, e: MouseEvent) {
  isShowContextMenu.value = true;
  currentActionTab.tab = tab;
  currentActionTab.index = index;
  contextMenuPosition.left = e.clientX;
  contextMenuPosition.top = e.clientY;
}

function closeContextMenu() {
  isShowContextMenu.value = false;
}

watch(
  () => isShowContextMenu.value,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeContextMenu)
    } else {
      document.body.removeEventListener('click', closeContextMenu)
    }
  }
)

const contextList = reactive([
  {
    name: '刷新',
    fn: () => alert('以后再实现'),
  },
  {
    name: '关闭',
    fn: () => closeTab(currentActionTab.index),
  },
  {
    name: '关闭其他',
    fn: () => closeOtherTab(currentActionTab.tab),
  },
  {
    name: '关闭到左侧',
    fn: () => closeLeftTab(currentActionTab.index),
  },
  {
    name: '关闭到右侧',
    fn: () => closeRightTab(currentActionTab.index),
  },
  {
    name: '关闭全部',
    fn: () => closeAllTab(),
  }
])

</script>


<template>
  <div class="tabBar">
    <transition-group name="tabBarList" tag="p" class="demo">
      <div class="tabBarList_item" :class="{ 'tabBarList_item-active': isCurrentTab(item) }"
        v-for="(item, index) in tabList" :key="index" @contextmenu.prevent="openContextMenu(item, index, $event)">
        <router-link :to="item.fullPath" class="tabName">{{ item.meta.title }}</router-link>
        <el-icon @click="closeTab(index)" size="15px">
          <close />
        </el-icon>
      </div>
    </transition-group>
    <div class="tabBarAction"></div>
    <div class="contextMenu" v-if="isShowContextMenu" :style="contextMenuStyle">
      <div class="contextMenu_item" v-for="item in contextList" :key="item.name" @click="item.fn">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tabBar {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
}

.tabBarList {
  height: 100%;
  display: flex;
  width: 300px;
  align-items: center;

  &_item {
    flex-shrink: 0;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #d8dce5;
    color: #495060;
    padding: 2px 8px;
    border-radius: 3px;
    display: inline-block;

    .tabName {
      margin-right: 5px;
      text-decoration: none;
    }

    &-active {
      background-color: #409EFF;
      border-color: #409EFF;
      color: #fff;

      .tabName {
        color: #fff;

      }
    }

    .el-icon {
      margin: 0 2px;
      vertical-align: middle;
      border-radius: 50%;

      &:hover {
        background-color: #00000030;
        color: #fff;
      }
    }
  }


}

.contextMenu {
  margin: 0;
  background: #fff;
  z-index: 1;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 #00000030;
  z-index: 999;

  &_item {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}

.tabBarList_item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

.tabBarList-enter-from,
.tabBarList-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}
</style>
