import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './locales'

import 'uno.css'
import './styles/index.css'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
