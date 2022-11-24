import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from 'vue3-cookies'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueAxios, axios)
app.use(VueCookies)
app.mount('#app')

