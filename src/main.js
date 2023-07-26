import './assets/main.css'
import Vuex from "vuex";
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from "../vuex/store"
import eventBus from 'vue3-eventbus'
import HighchartsVue from 'highcharts-vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
const app = createApp(App)

app.use(router)
app.use(Vuex)
app.use(HighchartsVue)
app.use(store)
app.use(eventBus)
app.use(VueAxios, axios)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD30TkFcOo7BbonSTzK4jmLLG4262ocqdg',
    },
})

app.mount("#app")
