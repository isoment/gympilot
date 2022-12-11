import { createApp } from "vue";
import App from "@/App.vue";
import "./assets/tailwind.css";

import axios from "axios";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

createApp(App).mount("#app");
