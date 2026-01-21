import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'
const pinia = createPinia()
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/Bangkok");
loadFonts()

/*createApp(App)
    .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')*/
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

// 👉 add configuration HERE
app.config.globalProperties.$confirm = function (message, title = 'Confirm') {
    return this.$root.openConfirm(message, title)
}


app.mount('#app')