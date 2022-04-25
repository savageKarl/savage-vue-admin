<script setup lang="ts">
import collapseBtn from './components/collapseBtn/index.vue';
import tabBar from './components/tabBar/index.vue';

</script>

<template>
  <el-header height="85px">
    <div class="navigationBar">
      <collapseBtn />
    </div>
    <tabBar />
  </el-header>
</template>



<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.navigationBar {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.collapseBtn {
  cursor: pointer;
}

.tabBar {
  height: 35px;
}
</style>