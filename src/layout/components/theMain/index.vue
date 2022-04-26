<script setup lang="ts">

</script>

<template>
  <el-main>
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>

</template>



<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.el-main {
  background: #f7f7f7;
}

.el-scrollbar__view {
  height: 100%;
}
</style>