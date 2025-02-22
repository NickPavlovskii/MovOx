import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; 

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount('#app');

