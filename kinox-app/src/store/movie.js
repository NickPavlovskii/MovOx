const movieModule = {
  state() {
    return {
      movies: [],
      movieDetails: {},
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setMovieDetails(state, movie) {
      state.movieDetails = movie;
    },
  },
  getters: {
    getMovieById: (state) => (movieId) => {
      return state.movies.find((movie) => movie.id === movieId);
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      const movies = await fetchMoviesData();
      commit('setMovies', movies);
    },
    async fetchMovie({ commit, state }, movieId) {
      if (state.movies.length === 0) {
        // Fetch movies if they haven't been loaded yet
        await this.dispatch('fetchMovies');
      }
      const movie = state.movies.find((movie) => movie.id === movieId);
      commit('setMovieDetails', movie);
    },
  },
};

const fetchMoviesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moviesData = require('../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
};

export default movieModule;
