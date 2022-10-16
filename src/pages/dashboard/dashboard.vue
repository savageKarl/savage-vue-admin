<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'dashboard' });
</script>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import {test} from '@/api/demo'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts'
// 系列类型的定义后缀都为 SeriesOption
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components'
// 组件类型的定义后缀都为 ComponentOption
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  // 数据集组件
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
} from 'echarts/components'

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
console.debug(test().then(res => {
  console.debug(res)
}))
const option: ECOption = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}

const container = ref<HTMLElement>()
let  myEchart;
onMounted(() => {
  myEchart = echarts.init(container.value as HTMLElement)
  myEchart.setOption(option)
})


function change() {
  myEchart.clear();
  myEchart?.setOption({
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    show: true,
  },
  yAxis: {
  },
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
})
}

function change2() {
  myEchart.clear();
  myEchart?.setOption({
  series : [
      {
          name: '访问来源',
          type: 'pie',    // 设置图表类型为饼图
          radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
          data:[          // 数据数组，name 为数据项名称，value 为数据项值
              {value:235, name:'视频广告'},
              {value:274, name:'联盟广告'},
              {value:310, name:'邮件营销'},
              {value:335, name:'直接访问'},
              {value:400, name:'搜索引擎'}
          ]
      }
  ],
  // yAxis: {
  //   show: false
  // },
  // xAxis: {
  //   show: false
  // }
})
}
onActivated(() => {
  console.debug('onActivated')
})
</script>
<template>
  <div>
    <h1>dashboard</h1>
    <div id="container" ref="container"></div>
    <button @click="change">切换图表1</button>
    <button @click="change2">切换图表1</button>
  </div>
</template>



<style scoped>
#container {
  width: 400px;
  height: 400px;
}
</style>