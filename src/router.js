// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from './views/RegisterPage.vue';
import Login from './views/LoginPage.vue';
import HomeView from './views/HomeView.vue';
import Page_1 from './views/PageOne.vue';
import Page_2 from './views/PageTwo.vue';
import store from '@/store'; 

const routes = [
  {
    path: '/RegisterPage',          
    component: Register,
    name: 'register',
  },
  {
    path: '/LoginPage',          
    component: Login,
    name: 'login',
  },
  {
    path: '/',            
    component: HomeView,
    name: 'home',
  },
  {
    path: '/PageOne',
    component: Page_1,
    name: 'page1',        
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/PageTwo',            
    component: Page_2,
    name: 'page2',
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLogin) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;