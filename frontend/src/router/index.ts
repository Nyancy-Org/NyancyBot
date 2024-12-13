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
        },

        {
          path: 'plugins',
          name: 'plugins',
          meta: {
            title: '插件管理'
          },
          component: () => import('../views/admin/Plugins.vue')
        },

        {
          path: 'plugins/:name/config',
          name: 'pluginsConfig',
          meta: {
            title: '插件配置'
          },
          component: () => import('../views/admin/PluginConfig.vue')
        },

        {
          path: 'ws',
          name: 'ws',
          meta: {
            title: '连接状态'
          },
          component: () => import('../views/admin/Ws.vue')
        },

        {
          path: 'settings',
          name: 'settings',
          meta: {
            title: '系统配置'
          },
          component: () => import('../views/admin/Settings.vue')
        }
      ]
    },

    // 403
    {
      path: '/403',
      name: '403',
      meta: {
        title: '403 Forbidden'
      },
      component: () => import('../views/error/403.vue')
    },

    // 404
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404 Not Found'
      },
      component: () => import('../views/error/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.name) {
    return next({
      path: '/404',
      replace: true,
      query: {
        errPath: to.fullPath
      }
    })
  }

  document.title = (to.meta.title || '首页') + ' - Nyancy Bot'

  next()
})

router.onError((err, to) => {
  console.error(to, err)
})

export default router
