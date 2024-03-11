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
    history: createWebHistory(process.env.BACKEND_URL),
    routes: [
        // without token
        {path: "/", component: Home},
        {path: "/login", component: Login},
        {path: "/register", component: Register}
        // need authorization
    ],
})

export default router;