import {defineStore} from "pinia"
// import axios from "axios";
import router from '@/router'

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userId: localStorage.getItem('userId') || "",
        username: localStorage.getItem('username') || "",
        name: localStorage.getItem('name') || "",
        token: localStorage.getItem('token') || "",
        refreshToken: localStorage.getItem('refreshToken') || "",
        isAdmin: localStorage.getItem('isAdmin') || "",
        device: localStorage.getItem('device') || "",
        roles: localStorage.getItem('roles') || "",
        gender: localStorage.getItem('gender') || "",
        url: localStorage.getItem('url') || "",
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
            let device = localStorage.getItem('device') || "";
            localStorage.clear()
            this.userId = '';
            this.username = '';
            this.name = '';
            this.token = '';
            this.isAdmin = '';
            this.gender = '';
            this.url = '';
            this.roles = [];
            this.refreshToken = '';
            localStorage.setItem('device', device);
            router.push('/')
        },
        login(user) {
            this.userId = user._id;
            this.username = user.username;
            this.name = user.profile.fullName;
            this.token = user.token;
            this.refreshToken = user.refreshToken || "";
            this.isAdmin = user.isAdmin;
            this.roles = user.roles;
            this.gender = user.gender;
            this.url = user.url;

            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('name', user.profile.fullName);
            localStorage.setItem('refreshToken', user.refreshToken);
            localStorage.setItem('isAdmin', user.isAdmin);
            localStorage.setItem('roles', user.roles);
            localStorage.setItem('gender', user.gender);
            localStorage.setItem('url', user.url);
        },
        /*async refreshAccessToken() {
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

        }*/
    }
})