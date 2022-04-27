
<script setup lang="ts">
import { onMounted } from 'vue'

import mapboxgl from 'mapbox-gl'

import MapboxLanguage  from '@mapbox/mapbox-gl-language'


const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiMjQ0MzAwNTAwNCIsImEiOiJja3huYWJlNWozaDFxMnBvazZwNTNuaXEwIn0.OihdyHTgguCGK7T4jXk5hQ';
  const map = new mapboxgl.Map({
    container: 'container',
    style: 'mapbox://styles/mapbox/streets-v11', //地图样式，可以使用官网预定义的样式,也可以自定义
    center: [118.726533, 32.012005], // 初始坐标系，这个是南京建邺附近
    zoom: 15,     // starting zoom 地图初始的拉伸比例
    pitch: 0,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
    bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
    antialias: true, //抗锯齿，通过false关闭提升性能
  })
  // var language = new MapboxLanguage({ defaultLanguage: "zh" });
  // map.addControl(language);
  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav, 'bottom-right')
}
onMounted(() => {
  initMap();
})
</script>

<template>
  <div id="container" class="container">
  </div>
</template>


<style scoped>
</style>