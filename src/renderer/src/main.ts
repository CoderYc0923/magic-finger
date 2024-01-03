import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css';
import { Modal as AModal } from 'ant-design-vue'

const app = createApp(App)

app.use(AModal)

app.use(router)

app.mount('#app')
