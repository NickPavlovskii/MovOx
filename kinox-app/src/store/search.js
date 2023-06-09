import { createStore } from 'vuex';
import moviesData from '../components/kinopoisk.json';

const store = createStore({
  state() {
    return {
      movies: [],
      searchQuery: '',
      filteredMovies: [], // Separate array for filtered and sorted movies
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setFilteredMovies(state, movies) {
      state.filteredMovies = movies;
    },
    sortMovies(state) {
      // Sort the filteredMovies array based on your sorting criteria
      state.filteredMovies.sort((a, b) => {
        // Replace 'propertyName' with the actual property you want to sort by
        return a.propertyName - b.propertyName;
      });
    },
  },
  actions: {
    searchMovies({ commit, state }) {
      const filteredMovies = moviesData.docs.filter(movie => {
        return (
         
          movie.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });
      commit('setMovies', moviesData.docs);
      commit('setFilteredMovies', filteredMovies);
      commit('sortMovies'); // Sort the filteredMovies array
    },
  },
});

export default store;
