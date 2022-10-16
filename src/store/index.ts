import type { App } from 'vue';

import { createPinia } from "pinia";

import { setupPersist } from './plugins/persist';

const pinia = createPinia();

setupPersist(pinia);

export default function setupPinia(app: App): void {
  app.use(pinia);
}