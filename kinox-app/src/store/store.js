import { createStore } from 'vuex';

const fetchMoviesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moviesData = require('../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
};

const store = createStore({
  state() {
    return {
      movies: require('../components/kinopoisk.json').docs,
      searchQuery: '',
      filteredMovies: [],
    };
  },
  getters: {
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
    isMovieRated: () => (movieId) => {
      // Logic to determine if the movie is rated
      const ratingKey = `rating_${movieId}`;
      return localStorage.getItem(ratingKey) === 'true';
    },
    isMovieBookmarked: () => (movieId) => {
      // Logic to determine if the movie is bookmarked
      const bookmarkKey = `bookmark_${movieId}`;
      return localStorage.getItem(bookmarkKey) === 'true';
    },
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setFilteredMovies(state, movies) {
      state.filteredMovies = movies;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    toggleLike(state, movieId) {
      const index = state.movies.findIndex((movie) => movie.id === movieId);
      if (index !== -1) {
        const movie = state.movies[index];
        movie.isLiked = !movie.isLiked;
        state.movies.splice(index, 1, movie);
      }
    },
  },
  actions: {
    fetchMovies({ commit }) {
      const moviesData = require('../components/kinopoisk.json');
      commit('setMovies', moviesData.docs);
    },
    async searchMovies({ commit, state }) {
      const movies = await fetchMoviesData();
      const filteredMovies = movies.filter((movie) => {
        return (
          movie.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });
      commit('setMovies', movies);
      commit('setFilteredMovies', filteredMovies);
    },
    toggleLike({ commit, state }, movieId) {
      commit('toggleLike', movieId);

      // Optionally, you can update the liked status in the filteredMovies array as well
      const index = state.filteredMovies.findIndex(
        (movie) => movie.id === movieId
      );
      if (index !== -1) {
        const movie = state.filteredMovies[index];
        movie.isLiked = !movie.isLiked;
        state.filteredMovies.splice(index, 1, movie);
      }
    },
  },
});

export default store;
