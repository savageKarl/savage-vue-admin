<script setup lang="ts">
import collapseBtn from './components/collapseBtn/index.vue';
import screenfull from './components/screenfull/index.vue';
import userMenu from './components/userMenu/index.vue';

</script>

<template>
  <div class="navigationBar">
    <div class="leftMenu">
      <collapseBtn />
    </div>
    <div class="rightMenu">
      <screenfull />
      <userMenu />
    </div>
  </div>
</template>

<style lang="scss">
.navigationBar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}


.rightMenu {
  display: flex;
  align-items: center;
}
</style>