import type { Router } from 'vue-router';

export function setupPageTitleGuard(router: Router) {

  const baseTitle = process.env.VUE_APP_TITLE || '';

  router.afterEach((to) => {
    const pageTitle = to.meta.title;
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  });
}