// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MainHeader from './components/Header/MainHeader.vue';
import MovieMain from './Pages/MainMain/MovieMain.vue';
import MovieList from './components/MovieList.vue';
import LikePage from './Pages/LikePage/LikePage.vue';
import MovieCollection from './Pages/Explore/MovieCollection.vue';
import MoviePage from './Pages/MoviePage/MoviePage.vue';

const routes = [
  {
    path: '/',
    name: 'movies-main',
    components: {
      default: MovieMain,
      header: MainHeader,
    },
  },

  {
    path: '/search',
    name: 'movies-list',
    components: {
      default: MovieList,
      header: MainHeader,
    },
  },
  {
   
    path: '/:type',
    components: {
      default: MovieCollection,
      header: MainHeader,
    },
  },
  {
   
    path: '/:genres',
    components: {
      default: MovieCollection,
      header: MainHeader,
    },
  },
  
  {
  path: '/movies/:id',
  name: 'movie-details',
  components: {
    default: MoviePage,
    header: MainHeader, 
   
    
  },
     props: true,
},

{
  path: '/bookmarks-ratings',
  components: {
    default: LikePage,
    header: MainHeader, 
   
    
  },
  name: 'bookmarks-ratings',

},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
