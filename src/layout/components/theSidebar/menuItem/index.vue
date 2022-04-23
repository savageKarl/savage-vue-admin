<script setup lang="ts">
import { defineProps } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

defineProps<{
  item: RouteRecordRaw,
}>();


</script>


<template>
  <template v-if="!item.children">
    <el-menu-item :index="item.path">
      <el-icon>
        <location />
      </el-icon>
      <template #title>{{ item.meta?.title }}</template>
    </el-menu-item>
  </template>
  <template v-else>
    <el-sub-menu :index="item.path">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <index v-for="(itemSub, index) in item.children" :key="index" :item="itemSub"></index>
    </el-sub-menu>
  </template>
</template>

<style scoped>
</style>