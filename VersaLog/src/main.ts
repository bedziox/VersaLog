import './assets/main.css'
import App from './App.vue'
import Vue from 'vue'
import router from "@/router/router";


const app = Vue.createApp({})

app.use(router)
app.mount("#app")
