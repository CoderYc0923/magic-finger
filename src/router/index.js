import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from './modules'
import { useCheckURL } from './hooks.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由守卫
router.beforeEach((to, from) => {
    return useCheckURL(to, from, router)
})

export default router