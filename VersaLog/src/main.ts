import './assets/main.css'
import App from './App.vue'
import {createApp} from 'vue'
import axios from "axios";
import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";


const guard = function(to, from, next) {
    // check for valid auth token
    axios.post(process.env.BACKEND_URL + 'Auth/valid/',localStorage.getItem('jwtToken')).then(response => {
        next();
    }).catch(error => {
        window.location.href = "/login";
    })
};


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // without token
        {path: "/", component: Home},
        {path: "/login", component: Login},
        {path: "/register", component: Register}
        // need authorization
    ],
})

const app = createApp(App).use(router).mount('#app')