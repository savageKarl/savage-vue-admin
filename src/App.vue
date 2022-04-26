<script setup lang="ts">

</script>

<template>
  <router-view/>
</template>

<style lang="scss">
body {
  width: 100%;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}

a {
	text-decoration: none; /* 去除默认的下划线 */
	outline: none;	/* 去除旧版浏览器的点击后的外虚线框 */
	color: #000;	/* 去除默认的颜色和点击后变化的颜色 */ 
}

.container {
  height: 100%;
  background: #ffffff;
}

</style>
