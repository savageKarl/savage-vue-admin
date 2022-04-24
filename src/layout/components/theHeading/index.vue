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