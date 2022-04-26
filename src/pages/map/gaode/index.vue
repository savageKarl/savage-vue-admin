
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import AMapLoader from '@amap/amap-jsapi-loader';
import { city } from '@/utils/map/city'

const AMap = ref<any>({});
const map = ref<any>({});
const AMapLoaderRes = ref(AMapLoader.load({
  "key": "6b3002956302391f814ea50cbf271b5e",              // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}));

const initMap = async () => {
  try {
    AMap.value = await AMapLoaderRes.value;
    map.value = new AMap.value.Map('container', {
      viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
      zoom: 4, //初始化地图层级
      center: [113.27696169556907, 23.08601863681046] //初始化地图中心点
    });
  } catch (e) {
    console.error(e);
  }
}


const addCenterMarker = () => {
  const marker = new AMap.value.Marker({
    // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
    position: [113.27696169556907, 23.08601863681046],
    // anchor: 'bottom-center',
    label: {
      direction: 'top',
      content: '我的位置'
    },
  });
  marker.on('click', function (e: MouseEvent) {
    alert('你点击了我的位置')
    console.debug(e)
  })

  map.value.add(marker);
}


const addMassiveMarkder = () => {
  // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
  const style = [{
    url: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    anchor: new AMap.value.Pixel(6, 6),
    size: new AMap.value.Size(11, 11),
    zIndex: 3,
  }, {
    url: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    anchor: new AMap.value.Pixel(4, 4),
    size: new AMap.value.Size(7, 7),
    zIndex: 2,
  }, {
    url: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    anchor: new AMap.value.Pixel(3, 3),
    size: new AMap.value.Size(5, 5),
    zIndex: 1,
  }
  ];
  const massMarks = new AMap.value.MassMarks(city, {
    opacity: 0.8,
    zIndex: 111,
    cursor: 'pointer',
    style: style
  });
  massMarks.setMap(map.value);
}

const addPointCluster = () => {
  map.value.plugin(["AMap.MarkerClusterer"], function () {
    var count = city.length;

    var _renderClusterMarker = function (context: any) {
      var factor = Math.pow(context.count / count, 1 / 18);
      var div = document.createElement('div');
      var Hue = 180 - factor * 180;
      var bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
      var fontColor = 'hsla(' + Hue + ',100%,90%,1)';
      var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
      var shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
      div.style.backgroundColor = bgColor;
      var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + 'px';
      div.style.border = 'solid 1px ' + borderColor;
      div.style.borderRadius = size / 2 + 'px';
      div.style.boxShadow = '0 0 5px ' + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + 'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.value.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div)
    };
    var _renderMarker = function (context: any) {
      var content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
      var offset = new AMap.value.Pixel(-9, -9);
      context.marker.setContent(content)
      context.marker.setOffset(offset)
      console.debug(context.marker)
    }
    const cluster = new AMap.value.MarkerClusterer(
      map.value,     // 地图实例
      city, // 海量点数据，数据中需包含经纬度信息字段 lnglat
      {
        gridSize: 80,
        renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
        renderMarker: _renderMarker, // 自定义非聚合点样式
      },
    );
    cluster.on('click', (cluster: any) => {
      alert(`你点击了${cluster.lnglat.lng},${cluster.lnglat.lat}`)
    })
    // console.debug(cluster)

  })
}

onMounted(async () => {
  await initMap();
  addCenterMarker();
  // addMassiveMarkder();
  // console.debug(city.length) // 3224
  addPointCluster();
})


</script>

<template>
  <div id="container" class="container">
  </div>
</template>


<style>
.container {
  width: 100%;
  height: 100%;
}

/* 去掉高德地图logo */
.amap-logo {
  display: none !important;
}

/* 去掉高德地图版本号 */
.amap-copyright {
  display: none !important;
}
</style>