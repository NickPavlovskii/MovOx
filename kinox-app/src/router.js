// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MyHeader from './components/Header/MyHeader.vue';
import MovieList from './components/MovieList.vue';
import LikePage from './components/LikePage.vue';
import MyMovies from './components/Explore/MyMovies.vue';
import MoviePage from './components/MoviePage/MoviePage.vue';

const routes = [
  {
    path: '/',
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

export default router;
