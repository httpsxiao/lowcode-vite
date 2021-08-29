import { createApp } from 'vue'
import router from './router'
import store, { key } from './store'
import App from './App.vue'
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElButton
} from 'element-plus'

const app = createApp(App)

const components = [
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElButton
]

components.forEach(component => {
  app.component(component.name, component)
})

app.use(router).use(store)

router.isReady().then(() =>  app.mount('#app'))
