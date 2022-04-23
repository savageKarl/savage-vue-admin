<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';

import { Fold, Expand } from '@element-plus/icons-vue';

const appStore = useAppStore();

const isCollapse = computed(() => appStore.isCollapseSideBar);
function toggleCollapseSidebar() {
  appStore.toggleCollapseSidebar()
}


</script>

<template>
  <el-header height="85px">
    <div class="navigationBar">
      <div class="collapseBtn">
        <el-icon :size="20" @click="appStore.toggleCollapseSidebar">
          <expand v-if="isCollapse" />
          <fold v-else />
        </el-icon>
      </div>
    </div>
    <div class="tabBar">tabBar</div>
  </el-header>
</template>



<style lang="scss" scoped>
.navigationBar {
  height: 50px;
  display: flex;
  align-items: center;
}

.collapseBtn {
  cursor: pointer;
}

.tabBar {
  height: 35px;
}
</style>