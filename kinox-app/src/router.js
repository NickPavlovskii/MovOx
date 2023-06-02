// router.js

import { createRouter, createWebHistory } from 'vue-router';

// Импортируйте компоненты для маршрутов
import MovieList from './components/MovieList.vue';
import   MyHeader from './components/Header/MyHeader.vue';
const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: MovieList,
    header: MyHeader,
  },
  // Добавьте другие маршруты здесь
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

