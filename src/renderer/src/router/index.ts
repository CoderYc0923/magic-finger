import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
