import axios from 'axios'
import {useAuthStore} from '@/store/auth'
import router from "@/router";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

api.interceptors.request.use(config => {
    const auth = useAuthStore()

    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
})


let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    response => response,
    async error => {
        const auth = useAuthStore()
        const originalRequest = error.config;

        if (originalRequest?._retry) {
            auth.logout();
            router.push({name: "Login"});
            return new Promise(() => {});
        }

        if ((error.response?.status === 401)) {
            console.log("Jol-Re");
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return api(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const newToken = await auth.refreshAccessToken()
                console.log("new token", newToken);
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return api(originalRequest)
            } catch (err) {
                processQueue(err, null)
                auth.logout()
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        } else if (error.response?.status === 403) {
            auth.logout();
            router.push({name: "Login"});
            return new Promise(() => {});
        }

        // return Promise.reject(error)
    }
)

export default api