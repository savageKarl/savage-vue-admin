<script lang="ts" setup>
import { reactive, watch, watchEffect, onMounted } from 'vue'

import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { Close } from '@element-plus/icons-vue'

/*
检测路由跳转，记录路由变量，存进一个列表里面，视图循环展示即可。存入列表需要需要去重，
  
*/
const tabList = reactive<RouteLocationNormalizedLoaded[]>([]);
const currentRoute = useRoute();

onMounted(() => {
  addTab(currentRoute);
})


// watch(() => route.name, (to) => {
//   addTab(route);
// })

onBeforeRouteLeave((to, from) => {
  addTab(to);
  // console.debug(to, from)
})

function addTab(route: RouteLocationNormalizedLoaded) {
  if (tabList.some(item => item.fullPath === route.fullPath)) {
    return;
  }
  tabList.push(Object.assign({}, route, {
    title: route.meta?.title || 'no-name'
  }));
  // tabList.push(route) // 这样子直接推入会有bug，不知道为什么，上面那样子写就不会
  console.debug(tabList)
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

// function closeOtherTab(route: RouteLocationNormalizedLoaded) {

// }

// function closeAllTab() {

// }

// function closeLeftTab(route: RouteLocationNormalizedLoaded) {

// }

// function closeRightTab(route: RouteLocationNormalizedLoaded) {

// }

</script>


<template>
  <div class="tabBar">
    <div class="tabBarList">
      <router-link class="tabBarList_item" :to="item.fullPath" :class="{ 'tabBarList_item-active': isCurrentTab(item) }"
        v-for="(item, index) in tabList" :key="index">
        <div class="tabName">{{ item.meta.title }}</div>
        <el-icon @click="closeCurrentTab(item)">
          <close />
        </el-icon>
      </router-link>
    </div>
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

    a {
      text-decoration: none;
    }

    .tabName {
      margin-right: 5px;
    }

    &-active {
      background-color: #409EFF;
      color: #fff;
      border-color: #409EFF;
    }
  }


}
</style>
