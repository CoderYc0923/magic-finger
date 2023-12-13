import Home from 'views/Home/index.vue'
import NotFound from 'views/NotFound/index.vue'

import { fatherRouters } from './father'

export const routes = [
    {
        path: '/',
        redirect: {name: 'Home'},
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