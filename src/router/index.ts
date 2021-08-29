import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '../components/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/404',
    name: 'Pagenotfound',
    component: () => import('../components/404/404.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  console.log('beforeEach')
})

router.afterEach(() => {
  console.log('afterEach')
})

export default router