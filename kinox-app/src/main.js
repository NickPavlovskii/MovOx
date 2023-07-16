import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; 

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS

const app = createApp(App);

app.use(router);
app.use(store); // Use the Vuex store
app.use(PrimeVue);

app.mount('#app');

