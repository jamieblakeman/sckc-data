import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "vue-select/dist/vue-select.css";
import "@/assets/styles/tailwind.css";
import ScrollPanel from "primevue/scrollpanel";
import VueSelect from "vue-select";
import ProgressBar from "primevue/progressbar";
const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.component("v-select", VueSelect);
app.component("ProgressBar", ProgressBar);

app.mount("#app");
