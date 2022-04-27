
<script setup lang="ts">
import { onMounted } from 'vue';
import { city } from '@/utils/map/city'

function loadBMap(ak: string) {
  return new Promise(function (resolve, reject) {
    if (typeof (window as any).BMap !== 'undefined') {
      resolve((window as any).BMap)
      return true
    }
    (window as any).onBMapCallback = function () {
      resolve((window as any).BMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}


function loadMarkerCLusterPlugin1() {
  return new Promise<any>(function (resolve, reject) {
    import('./TextIconOverlay_min').then(res => {
      resolve((window as any).BMapLib)
    })
    // (window as any).onMarkerPluginCallback = function () {
    //   console.debug('加载了吗')
    //   resolve(true);
    // }
    // let script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.src =
    //   '//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js?callback=onMarkerPluginCallback'
    // script.onerror = reject
    // document.head.appendChild(script)
  })
}

function loadMarkerCLusterPlugin2() {
  return new Promise(function (resolve, reject) {
    import('./MarkerClusterer_min').then(res => {
      resolve((window as any).BMapLib)
    })
    //   if (typeof (window as any).BMapLib !== 'undefined') {
    //     resolve((window as any).BMapLib)
    //     return true
    //   }
    //   (window as any).onBMapLibCallback = function () {
    //     resolve((window as any).BMapLib)
    //   }
    //   let script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src =
    //     'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js'
    //   script.onerror = reject
    //   document.head.appendChild(script)
  })
}

let BMap: any;
let BMapLib: any;

let map: any;
function initMap() {
  map = new BMap.Map("container");
  const point = new BMap.Point(113.28340641039617, 23.09235684601844);
  map.centerAndZoom(point, 15);
  // 启动鼠标滚轮缩放
  map.enableScrollWheelZoom(true);
  // 设置个性化地图
  map.setMapStyleV2({
    styleId: '6d050d9e76e30448a3b8f5c88ad71a43'
  });
}

function addMarker() {
  const point = new BMap.Point(113.28340641039617, 23.09235684601844);
  const marker = new BMap.Marker(point);        // 创建标注    
  marker.addEventListener("click", function (e: MouseEvent) {
    console.debug(e)
    alert("您点击了标注");
  });
  map.addOverlay(marker);
}

const addMarkerCLuster = () => {
  // 使用本地文件，添加聚合点报错，在index.html引入链接，可以显示聚合点，但是三千数据点就卡顿严重
  console.debug(BMapLib)
  const markers: any[] = [];
  city.forEach(item => {
    const point = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
    const marker = new BMap.Marker(point);
    markers.push(marker)
  })
  var markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers });
  console.debug(markerClusterer)
}
onMounted(async () => {
  try {
    BMap = await loadBMap('qcxokzuhl8hvUbQuEfjQeqlBMF0dN9qm');
    initMap();
    addMarker();
    const BMapLib1 = await loadMarkerCLusterPlugin1();
    console.debug(BMapLib1)
    BMapLib = await loadMarkerCLusterPlugin2();
    BMapLib = {...BMapLib1, ...BMapLib}
    console.debug(BMapLib)
    // addMarkerCLuster();
    // const res = await import('./index.js')
    // console.debug(res)
  } catch (e) {
    console.error(e);
  }

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