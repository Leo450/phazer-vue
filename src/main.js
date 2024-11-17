import './assets/main.scss'

import App from './App.vue'
import { AppPinia } from './pinia'
import { createApp } from 'vue'

createApp(App)
    .use(AppPinia)
    .mount('#app')
