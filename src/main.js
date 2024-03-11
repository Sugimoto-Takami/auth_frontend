// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from '@/store';

const app = createApp(App);

app.config.globalProperties.$axios = axios.create({
  baseURL: 'http://localhost:3000/'
});

app.use(router).use(store).mount('#app');