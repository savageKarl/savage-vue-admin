<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import logo from './logo/index.vue';
import menuItem from './menuItem/index.vue';

import { useAppStore } from '@/store/modules/app';

import { useMenuRouteStore } from '@/store/modules/menuRoute';

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import MenuItem from './menuItem/index.vue';


const appStore = useAppStore();
const routeStore = useMenuRouteStore();
const isCollapse = computed(() => appStore.isCollapseSideBar);
const menuRoutes = computed(() => routeStore.menuRoutes);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<template>
  <!-- 侧边栏的宽度暂时先这样子定200px，到时候整个单独的样式文件来设置宽度，以及选中和激活的样式 -->

  <el-aside width="200px" :class="{'collapseSideBar': isCollapse}">
    <el-scrollbar>
      <!-- <logo :collapse="isCollapse"></logo> -->
      <el-menu :default-active="$router.currentRoute.value.path" :collapse="isCollapse" unique-opened @open="handleOpen"
        @close="handleClose" router>
        <menu-item v-for="(item, index) in menuRoutes" :item="item" :key="index"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<style lang="scss" scoped>
.el-aside {
  transition: all .25s;
}

.collapseSideBar {
  width: 64px;

  & span {
    color: red;
    visibility: hidden;
    transition: .3s;
  }
}
</style>