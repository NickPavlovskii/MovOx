import { createStore } from 'vuex';

const fetchMoviesData = () => {
  return new Promise((resolve) => {
    // Здесь происходит имитация асинхронного запроса данных
    setTimeout(() => {
      const moviesData = require('../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
};
const store = createStore({
  state() {
    return {
      movies: [],
      searchQuery: '',
      filteredMovies: [], // Добавить filteredMovies в состояние
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setFilteredMovies(state, movies) { // Добавить новую мутацию для обновления filteredMovies
      state.filteredMovies = movies;
    },
  },
  actions: {
    async searchMovies({ commit, state }) {
      const movies = await fetchMoviesData();
      const filteredMovies = movies.filter((movie) => {
        return (
          movie.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });
      commit('setMovies', movies);
      commit('setFilteredMovies', filteredMovies); // Вызвать новую мутацию для обновления filteredMovies
    },
  },
});


export default store;
