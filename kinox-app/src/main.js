import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; // Import the Vuex store

// import VueCarousel from 'vue-carousel';
// import Vue from 'vue';
// Vue.use(VueCarousel);

const app = createApp(App);
app.use(router);
app.use(store); // Use the Vuex store

app.mount('#app');

