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

app.use(router).use(store, key)

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
