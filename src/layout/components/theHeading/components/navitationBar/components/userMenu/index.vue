<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';

import { useUserStore } from '@/store/modules/user'

import { useRouter } from 'vue-router'

const userStore = useUserStore();
const router = useRouter();
function logout() {
  userStore.setRoles([]);
  userStore.setToken('');
  userStore.setName('');
  router.replace('/login');
}

</script>

<template>
  <el-dropdown class="userMenu">
    <el-avatar :icon="UserFilled" :size="34" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>中文文档</el-dropdown-item>
        <el-dropdown-item>English Docs</el-dropdown-item>
        <el-dropdown-item>GitHub</el-dropdown-item>
        <el-dropdown-item>Gitee</el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
.userMenu {
  margin: 0 5px;
}
</style>