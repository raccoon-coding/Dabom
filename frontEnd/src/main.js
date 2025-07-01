import './assets/main/main.css'
import './assets/main/header.css'
import './assets/main/footer.css'
import './assets/main/index.css'
import './assets/main/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
