import { createStore } from 'vuex';
import sortingModule from './modules/sorting';
import movie from './modules/movie';
import bookmarks from './modules/bookmarks';

const store = createStore({
  modules: {
   sorting: sortingModule, 
   movie:movie,
   bookmarks
  },
 
});

export default store;
