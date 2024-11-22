/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: () => import('../views/HomeView.vue')
    },

    // admin
    {
      path: '/admin',
      name: 'admin',
      meta: {
        needLogin: true,
        needAdmin: true
      },
      component: () => import('../views/admin/index.vue'),

      children: [
        {
          path: '',
          name: 'adminRedirect',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            title: '仪表板'
          },
          component: () => import('../views/admin/Dashboard.vue')
        }
      ]
    }
  ]
})

router.onError((err, to) => {
  console.error(to, err)
})

export default router
