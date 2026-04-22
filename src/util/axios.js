import axios from 'axios'
import {useAuthStore} from '@/store/auth'
import {Constants} from "@/lib/constant";

const api = axios.create({
    baseURL: Constants.VUE_APP_API_URL
})

api.interceptors.request.use(config => {
    const auth = useAuthStore()

    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
})


export default api