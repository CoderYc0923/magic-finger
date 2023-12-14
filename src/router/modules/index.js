import Home from 'views/Home/index.vue'
import Login from 'views/Login/index.vue'
import NotFound from 'views/NotFound/index.vue'

import { fatherRouters } from './father'

export const routes = [
    {
        path: '/',
        redirect: {name: 'Login'},
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    },
    ...fatherRouters
]
