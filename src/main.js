/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";
import VMask from "@ssibrahimbas/v-mask";


// Router
import router from "./routes/router";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const pinia = createPinia();
const app = createApp(App);

registerPlugins(app);

app.use(pinia);
app.use(router);
app.use(VMask);

app.mount("#app");
