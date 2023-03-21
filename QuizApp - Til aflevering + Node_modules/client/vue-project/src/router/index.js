import { createRouter, createWebHistory, useRouter } from "vue-router";
import useUser from "../composables/useUser";

const user = useUser()
if (user.refreshToken.value) {
  await user.refresh();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      name: 'App',
      component: () => import('../views/AppView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        auth: true
      }
    },
  ]
})

router.beforeEach((to) => {
  if(to.meta.auth && !user.user.value) {
    return router.push('/login')
  }
  else if(!to.meta.auth && user.user.value) {
    return router.push('/')
  }
})

export default router
