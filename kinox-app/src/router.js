// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MyHeader from './components/Header/MyHeader.vue';
import MovieList from './components/MovieList.vue';
import TVShows from './components/Explore/TVShows.vue';
import MyMovies from './components/Explore/MyMovies.vue';

const routes = [
  {
    path: '/',
    components: {
      default: MovieList,
      header: MyHeader,
    },
  },
  {
    path: '/movies',
    components: {
      default: MyMovies,
      header: MyHeader,
    },
  },
  {
    path: '/tv-shows',
    components: {
      default: TVShows,
      header: MyHeader,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
