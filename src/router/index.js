import { createRouter, createWebHistory} from "vue-router";
import Home from '@/components/HomePage.vue'
import Login from '@/components/LoginPage.vue'
import Orders from '@/components/OrdersPage.vue'
import Stores from '@/components/StoresPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/stores',
        name: 'Stores',
        component: Stores
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
