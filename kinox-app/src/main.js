import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; // Import the Vuex store

import PrimeVue from 'primevue/config';




const app = createApp(App);

app.use(router);
app.use(store); // Use the Vuex store
app.use(PrimeVue);

app.mount('#app');

