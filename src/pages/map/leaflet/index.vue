
<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { createMap, createTileLayer, addMarker, } from './map'

import type { Map, Icon } from 'leaflet'
import L from 'leaflet'
// import 'leaflet.chinatmsproviders';
import { city } from '@/utils/map/city'

// 引入点聚合插件
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";


let map: Map;

// const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSMUrl = 'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'; // 高德图层，使用时需要将坐标转为gcj02

const addMarkers = (icon: Icon) => {
  const markders = city.map(item => {
    return L.marker([item.lnglat[1], item.lnglat[0]], { icon });
  })
  L.layerGroup(markders).addTo(map)
}


const addCircles = () => {
  const circles = city.map(item => {
    return L.circle([item.lnglat[1], item.lnglat[0]], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).bindPopup(item.name, { closeButton: false, autoClose: false }).openPopup();
  })
  console.debug(circles.length)
  L.layerGroup(circles).addTo(map)
}


const addMarkerCluster = (icon: Icon) => {
  const markers = L.markerClusterGroup();
  city.forEach(item => {
    const marker = L.marker([item.lnglat[1], item.lnglat[0]], { icon });
    markers.addLayer(marker);
    // marker.bindPopup(item.name, { closeButton: false, autoClose: false });
    marker.on({
      click: function(e) {
        console.debug(e, item);
      }
    })
  })

  map.addLayer(markers);

}

onMounted(() => {
  map = createMap('container', {
    // crs: L.CRS.EPSG4326,
    preferCanvas: true,
    minZoom: 3,
  });
  map.setView([23.089228527727386, 113.27508121375594], 20);
  createTileLayer(map, OSMUrl, { maxZoom: 19 });
  // 使用 chinaProvider 插件可以直接使用改插件封装好的图层
  // (L.tileLayer as any).chinaProvider('GaoDe.Normal.Map',{maxZoom:18,minZoom:5}).addTo(map);

  // 自定义图标
  const customIcon = L.icon({
    iconUrl: 'https://leafletjs.cn/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.cn/examples/custom-icons/leaf-shadow.png',
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

  })
  addMarker(map, [23.089228527727386, 113.27508121375594], { icon: customIcon });
  // addMarkers(customIcon); // 添加三千多个点后，移动卡顿严重
  // addCircles();
  addMarkerCluster(customIcon);

})

</script>

<template>
  <div id="container" class="container">
  </div>
</template>


<style scoped>
</style>