import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "vue-select/dist/vue-select.css";

import ScrollPanel from "primevue/scrollpanel";
import VueSelect from "vue-select";
import ProgressBar from "primevue/progressbar";
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import PickList from 'primevue/picklist';
import "../src/style.css";
const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.component("v-select", VueSelect);
app.component("ProgressBar", ProgressBar);
app.component("Chip", Chip)
app.component("PickList", PickList)
app.component("PVButton", Button)
app.mount("#app");
