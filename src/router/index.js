import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
// import Konfigurasiview from '@/views/Konfigurasiview.vue'
// import ServerView from '@/views/ServerView.vue'
// import wifiView from '@/views/WifiView.vue'

import NotFoundView from '@/views/NotFoundView.vue'

import DashboardView from '@/views/DashboardView.vue'
import ProximityView from '@/views/ProximityView.vue'
import HistoriView from '@/views/HistoriView.vue'
import PzemView from '@/views/PzemView.vue'
// import Register from '@/components/Register.vue'
import { d$auth } from '@/stores/auth'
import { getCookies } from '@/plugins/cookies'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // {
    //   path: '/Register',
    //   name: 'Register',
    //   component: Register
    // },
    // {
    //   path: '/konfigurasi/wifi',
    //   name: 'konfigurasiwifi',
    //   component: wifiView
    // },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: ServerView
    // },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { auth: true }
    },
    {
      path: '/proximity',
      name: 'proximity',
      component: ProximityView,
      meta: { auth: true }
    },
    {
      path: '/pzem',
      name: 'pzem',
      component: PzemView,
      meta: { auth: true }
    },
    {
      path: '/history',
      name: 'History',
      component: HistoriView,
      meta: { auth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getCookies('CERT');
  const loggedIn = d$auth().isLoggedIn;
  if (!token && to.meta.auth && !loggedIn) {
    next({ name: 'login' });
  } else if (to.name == 'login' && token) {
    next({ name: 'dashboard' })
  } else {
    // Otherwise, allow navigation to proceed
    next();
  }
});


export default router
