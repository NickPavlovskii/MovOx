// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MyHeader from './components/Header/MyHeader.vue';
import MovieMain from './Pages/MainMain/MovieMain.vue';
import MovieList from './components/MovieList.vue';
import LikePage from './Pages/LikePage/LikePage.vue';
import MyMovies from './Pages/Explore/MyMovies.vue';
import MoviePage from './Pages/MoviePage/MoviePage.vue';

const routes = [
  {
    path: '/',
    name: 'movies-main',
    components: {
      default: MovieMain,
      header: MyHeader,
    },
  },

  {
    path: '/search',
    name: 'movies-list',
    components: {
      default: MovieList,
      header: MyHeader,
    },
  },

 


  {
   
    path: '/:type',
    components: {
      default: MyMovies,
      header: MyHeader,
    },
  },
  {
   
    path: '/:genres',
    components: {
      default: MyMovies,
      header: MyHeader,
    },
  },
  
  {
  path: '/movies/:id', // Add a dynamic parameter for the movie ID
  name: 'movie-details',
  components: {
    default: MoviePage,
    header: MyHeader, 
   
    
  },
     props: true,
},

{
  path: '/bookmarks-ratings',
  components: {
    default: LikePage,
    header: MyHeader, 
   
    
  },
  name: 'bookmarks-ratings',

},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach(() => {
  // Прокрутка страницы в начало при каждом переходе через роутер
  window.scrollTo(0, 0);
});
export default router;
