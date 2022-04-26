<script setup lang="ts">
import navigationBar from './components/navitationBar/index.vue';
import tabBar from './components/tabBar/index.vue';
</script>

<template>
  <el-header height="85px">
    <navigationBar />
    <tabBar />
  </el-header>
</template>



<style lang="scss" scoped>
.el-header {
  padding: 0;
}

.collapseBtn {
  cursor: pointer;
}

.tabBar {
  height: 35px;
}
</style>