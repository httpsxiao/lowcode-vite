import { createApp } from 'vue'
import router from './router'
import store, { key } from './store'
import { createToast } from './plugins/toast'
import App from './App.vue'
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElButton
} from 'element-plus'
import {
  LibButton
} from './library'

const app = createApp(App)

const components = [
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElButton,
  LibButton
]

components.forEach(component => {
  app.component(component.name, component)
})

app.use(router).use(store, key)

const toast = createToast()
app.use(toast)

fetch('/api/componentList')
  .then(response => {
    return response.json()
  })
  .then(data => {
    store.commit('setState', {
      key: 'componentList',
      value: data.list
    })
  })
  .then(() => router.isReady())
  .then(() =>  app.mount('#app'))
