import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string;
    /** 用户角色 */
    roles?: string[];
    /** 是否在侧边栏不显示， 默认判断为 false */
    isHidden?: boolean;
    /** 是否菜单路由， 默认判断为 true */
    isMenuRoute?: boolean;
  }
}