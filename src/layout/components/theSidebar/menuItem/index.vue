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
  <div>
    <template v-if="!item.children">
      <el-menu-item :index="item.path">{{ item.meta?.title }}</el-menu-item>
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
  </div>
</template>

<style scoped>
</style>