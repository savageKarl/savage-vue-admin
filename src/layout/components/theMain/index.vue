<script setup lang="ts">

</script>

<template>
  <el-main style="background-color: aquamarine;">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>

</template>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>