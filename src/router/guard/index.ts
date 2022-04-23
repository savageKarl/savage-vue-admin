import type { Router } from 'vue-router';

import { setupPageTitleGuard } from './modules/pageTitleGuard';
import { setupPermissionGuard } from './modules/permissionGuard';

export function setupRouterGuard(router: Router) {
  setupPageTitleGuard(router);
  setupPermissionGuard(router);
}