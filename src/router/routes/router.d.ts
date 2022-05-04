import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string;
    /** 用户角色 */
    roles?: string[];
    /** 是否在侧边栏不显示，默认为 false */
    isHidden?: boolean;
    /** 是否菜单路由， 默认为 true */
    isMenuRoute?: boolean;
    /** 是否缓存路由， 默认为 true */
    keepAlive?: boolean;
  }
}