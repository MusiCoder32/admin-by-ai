import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('@/layouts/BaseLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
          meta: { title: 'Dashboard' }
        }
      ]
    }
  ]
})

router.afterEach(to => {
  if (to.meta?.title) {
    document.title = `Admin by AI | ${to.meta.title as string}`
  }
})

export default router
