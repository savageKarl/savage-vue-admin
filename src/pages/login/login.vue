<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'login' });
</script>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


import { ElMessage, ElLoading } from 'element-plus';
import type { FormInstance } from 'element-plus'

import { initRoutes } from '@/router/utils';

import { useUserStore } from '@/store/modules/user';
const formRef = ref<FormInstance>()

const form = reactive({
  name: 'admin',
  password: 'admin'
});

const ruls = reactive({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
});

const router = useRouter();

const onSubmit = async (formEl: FormInstance) => {
  const loadingInstance = ElLoading.service({
    text: '登陆中...',
    background: 'Transparent',
  })
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      setTimeout(() => {
        loadingInstance.close();
        const userStore = useUserStore();
        userStore.setToken('savageToken');
        userStore.setRoles(['admin']);
        initRoutes();
        router.push({
          path: '/'
        })
      }, 1000);

    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="loginContainer">
    <el-form :model="form" label-width="120px" :rules="ruls" ref="formRef">
      <h3 class="title">用户登录</h3>
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef as any)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  display: flex;
  background: lightblue;
  // justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
}

.el-form {
  width: 400px;
}
</style>