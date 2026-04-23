import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ShowLatLng from '../views/ShowLatLng.vue'
import ChangePassword from '../views/ChangePassword.vue'


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
        path: '/changePassword',
        name: 'changePassword',
        component: ChangePassword,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Employee",
        }
    },
    {
        path: '/showlatlng',
        name: 'showlatlng',
        component: ShowLatLng
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
            roles: "Employee",
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

import {useAuthStore} from "@/store/auth";

router.beforeEach((to, from, next) => {
        console.log(useAuthStore().roles);
        switch (to.meta.roles) {
            case "Employee":
                useAuthStore().roles.indexOf(to.meta.roles) > -1 ? next() : next("/");
                // !!GlobalFn.CheckRoles({roles: Constants.entryReport}) ? next() : !!Meteor.userId() ? "" : next("/login");
                break;
            default:
                next();
                break;
        }
    }
)

export default router
