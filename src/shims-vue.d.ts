/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const BMap: any;

declare module '@mapbox/mapbox-gl-language' {
  export default class MapboxLanguage {
    constructor(arg: any){}
  }
}