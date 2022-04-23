import { createApp } from 'vue';
import App from './App.vue';

import 'element-plus/dist/index.css';
import 'normalize.css/normalize.css';

import setupRouter from '@/router';
import setupPinia from '@/store'

const app = createApp(App);

setupRouter(app);
setupPinia(app);

// 必须在最后一行
app.mount('#app');

