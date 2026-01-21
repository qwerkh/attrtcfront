import {defineStore} from "pinia"
import axios from "axios";
import router from '@/router'

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userId: localStorage.getItem('userId') || null,
        userName: localStorage.getItem('user') || null,
        email: localStorage.getItem('email') || null,
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        role:localStorage.getItem('role') || null,
    }),
    actions: {
        setTokens(access, refresh) {
            this.token = access
            this.refreshToken = refresh
            localStorage.setItem('token', access)
            localStorage.setItem('refreshToken', refresh)
        },
        logout() {
            this.$reset()
            localStorage.clear()
            this.userId = '';
            this.userName = '';
            this.email = '';
            this.token = '';
            this.role = '';
            this.refreshToken = '';
            router.push('/')
        },
        login(user) {
            this.userId = user.id;
            this.token = user.token;
            this.email = user.email;
            this.userName = user.name;
            this.refreshToken = user.refreshToken;
            this.role = user.role;

            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('user', user.name);
            localStorage.setItem('email', user.email);
            localStorage.setItem('refreshToken', user.refreshToken);
            localStorage.setItem('role', user.role);
        },
        async refreshAccessToken() {
            try {
                const res = await axios.post(
                    process.env.VUE_APP_API_URL + '/auth/refresh',
                    {
                        token: this.refreshToken
                    },
                    {
                        headers: {
                            token:process.env.VUE_APP_API_SECRET
                        }
                    }
                    )
                this.setTokens(res.data.accessToken, res.data.refreshToken)
                return res.data.accessToken
            } catch (err) {
                console.log(err)
                router.push('/');
                return false;
            }

        }
    }
})