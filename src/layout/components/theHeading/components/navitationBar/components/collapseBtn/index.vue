<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app';
import { Fold, Expand } from '@element-plus/icons-vue';
const appStore = useAppStore();
</script>

<template>
  <div class="collapseBtn">
    <el-icon :size="20" @click="appStore.toggleCollapseSidebar">
      <expand v-if="appStore.isCollapseSideBar" />
      <fold v-else />
    </el-icon>
  </div>
</template>

<style lang="scss">
.collapseBtn {
  cursor: pointer;
}
</style>