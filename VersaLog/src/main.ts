import "./assets/main.css";
import App from "./App.vue";
import { createApp, watch } from "vue";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import router from "@/router";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
