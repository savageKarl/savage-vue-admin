<script lang="ts" setup>
import { reactive, watch, watchEffect, onMounted } from 'vue'

import { useRoute, onBeforeRouteLeave } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { Close } from '@element-plus/icons-vue'
import { router } from '@/router';

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

function closeCurrentTab(route: RouteLocationNormalizedLoaded) {
  tabList.forEach((item, index) => {
    if (item.fullPath === route.fullPath) tabList.splice(index, 1);
  })
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

// function closeOtherTab(route: RouteLocationNormalizedLoaded) {

// }

// function closeAllTab() {

// }

// function closeLeftTab(route: RouteLocationNormalizedLoaded) {

// }

// function closeRightTab(route: RouteLocationNormalizedLoaded) {

// }
function scroll(e: MouseEvent) {
  console.debug(e)
} 
</script>


<template>
  <div class="tabBar">
    <el-scrollbar>
      <div class="tabBarList" @mousewheel="scroll">
        <div class="tabBarList_item" :class="{ 'tabBarList_item-active': isCurrentTab(item) }"
          v-for="(item, index) in tabList" :key="index">
          <router-link :to="item.fullPath" class="tabName">{{ item.meta.title }}</router-link>
          <el-icon @click="closeTab(index)">
            <close />
          </el-icon>
        </div>
      </div>
    </el-scrollbar>
    <div class="tabBarAction"></div>
  </div>
</template>

<style lang="scss">
.tabBar {
  display: flex;
  align-items: center;
}

.tabBarList {
  display: flex;
  width: 300px;

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
  }


}
</style>
