import "./assets/css/base.css"
import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./helpers"
import { pinia } from './store'

const initApp = async () => {
  const app = createApp(App)

  app.use(router)
  app.use(pinia)

  app.mount("#app")
}
initApp()
