import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import EmployeeView from '../views/EmpolyeeView.vue'
import ChekInByDayView from '../views/CheckInByDay.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/employee',
        name: 'employee',
        component: EmployeeView,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Admin",
        }
    },
    {
        path: '/checkInByDay',
        name: 'checkInByDay',
        component: ChekInByDayView, meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Admin",
        }
    },
    {
        path: '/scan',
        name: 'CheckIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CheckInView.vue'),
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Teacher",
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

import {useAuthStore} from "@/store/auth";

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const user = useAuthStore();
    switch (to.meta.roles) {
        case "Admin":
            user.role === "Admin" ? next() : next("/scan");
            break;
        case "Teacher":
            user.role === "Teacher" ? next() : next("/checkInByDay");
            break;
        default:
            next();
            break;
    }

    if (to.name === 'register') {
        next();
    } else if (to.meta.requiresAuth && !token) {
        next('/')
    } else if (to.path === '/' && token) {
        next('/Scan')
    } else {
        next()
    }
})

export default router
