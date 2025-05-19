import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Unicon from 'vue-unicons'
import { uniSync, uniPlus,uniPen, uniTrashAlt } from 'vue-unicons/dist/icons'

Unicon.add([uniSync,uniPlus,uniPen, uniTrashAlt])
const app = createApp(App)
app.use(Unicon)
app.use(store)
app.mount("#app")

