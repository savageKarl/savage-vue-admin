<script setup lang="ts">
/**每个路由使用layout组件的原因是，权限控制
  */
import TheHeading from './components/theHeading/index.vue';
import theMain from './components/theMain/index.vue';
import theSidebar from './components/theSidebar/index.vue';
import theFooter from './components/theFooter/index.vue';
</script>

<template>
  <el-container class="layoutContainer">
    <theSidebar></theSidebar>
    <el-container>
      <TheHeading></TheHeading>
      <theMain></theMain>
      <el-footer style="background-color: bisque;">Footer</el-footer>
    </el-container>
  </el-container>
</template>



<style lang="scss" scoped>
.layoutContainer {
  width: 100%;
  height: 100%;
}

</style>