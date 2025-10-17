import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupI18n } from './plugins/i18n'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
import 'element-plus/theme-chalk/src/index.scss'
import 'virtual:svg-icons-register'
import 'uno.css'
import './styles/index.scss'

const app = createApp(App)

const pinia = createPinia()
const i18n = setupI18n()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.mount('#app')
