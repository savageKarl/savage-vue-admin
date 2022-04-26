<script lang="ts" setup>
// screenfull的依赖要用 @5.1.0版本，不然用不了，报错
import { FullScreen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const toggleFullScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('您的浏览器无法工作')
    return
  }
  screenfull.toggle()
}
</script>


<template>
  <div class="" @click="toggleFullScreen">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon :size="20">
        <full-screen />
      </el-icon>
    </el-tooltip>
  </div>
</template>


<style lang="scss">
  .screenfull {
    cursor: pointer;
  }
</style>


