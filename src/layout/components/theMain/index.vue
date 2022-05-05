<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
const cahcheRouteName = router.getRoutes().filter(item => item.meta.keepAlive)
  .map(item => item.name) as string[];
</script>

<template>
  <el-main>
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive :include="cahcheRouteName">
            <component :is="Component" />
          </keep-alive>
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