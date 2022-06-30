<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import type { PropType } from 'vue';

import { debounce } from 'lodash'

import echarts from './index';
import type { ECOption } from './index';


const props = defineProps({
  options: {
    type: Object as PropType<ECOption>,
    required: true,
  },
  width: {
    type: String,
    default: '300px',
  },
  height: {
    type: String,
    default: '300px',
  }
});


const echartId = ref('');
echartId.value = getUUID();

function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let myEchart: echarts.ECharts;


function initChart() {
  myEchart = echarts.init(document.getElementById(echartId.value) as HTMLElement)
  window.addEventListener('resize', debounce(() => {
    myEchart.resize();
  }));
}

onMounted(() => {
  initChart();
  myEchart.setOption(props.options);
});


watch(() => props.options, (value, oldValue) => {
  console.debug(value, oldValue);
  nextTick(() => myEchart.setOption(props.options));
})


</script>
<template>
  <div class="echart" :id="echartId"></div>
</template>



<style>
.echart {
  width: v-bind(width);
  height: v-bind(height);
  /* width: 300px;
  height: 300px; */
}
</style>