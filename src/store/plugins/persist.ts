import type { Pinia } from 'pinia';

import piniaPersist from 'pinia-plugin-persist';

export const setupPersist = (pinia: Pinia) => {
  pinia.use(piniaPersist);
}