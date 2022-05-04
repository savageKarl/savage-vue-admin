<script setup lang="ts">

</script>

<template>
  <el-main>
    <el-scrollbar>
      {{$route.meta.keepAlive ?? true}}
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive v-if="$route.meta.keepAlive ?? true">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
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