
<script setup lang="ts">
import { onMounted } from 'vue';

let BMap: any;

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    var script = document.createElement("script");
    script.src = "https://api.map.baidu.com/api?v=3.0&ak=qcxokzuhl8hvUbQuEfjQeqlBMF0dN9qm&callback=initialize";
    document.body.appendChild(script);
    script.onload = () => {
      BMap = (window as any).BMap;
      resolve();
    };
    script.onerror = reject;
  })
}

let map: any;
function initMap() {
  map = new BMap.Map("container");
  var point = new BMap.Point(113.28340641039617, 23.09235684601844);
  map.centerAndZoom(point, 15);
  // 启动鼠标滚轮缩放
  map.enableScrollWheelZoom(true);
  // 设置个性化地图
  map.setMapStyleV2({
    styleId: '6d050d9e76e30448a3b8f5c88ad71a43'
  });
}

function addMarker() {
  var point = new BMap.Point(113.28340641039617, 23.09235684601844);
  var marker = new BMap.Marker(point);        // 创建标注    
  marker.addEventListener("click", function(e: MouseEvent){    
    console.debug(e)
    alert("您点击了标注");    
});  
  map.addOverlay(marker);
}

onMounted(async () => {
  await loadScript();
  initMap();
  addMarker();
})

</script>

<template>
  <div id="container">
    baidu
  </div>
</template>


<style>
#container {
  width: 100%;
  height: 100%;
}

.BMap_cpyCtrl {
  display: none !important;
}

.anchorBL {
  display: none !important;
}
</style>