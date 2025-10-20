import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './locales'

import 'uno.css'
import './styles/index.scss'
import 'element-plus/theme-chalk/src/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
