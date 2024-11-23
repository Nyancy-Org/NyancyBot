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
  ],
})

router.onError((err, to) => {
 console.error(to,err)
})

export default router
