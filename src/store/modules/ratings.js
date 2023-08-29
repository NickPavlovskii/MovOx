// store/modules/ratings.js
const state = {
  rating: null,
};

const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },
  updateRating(state, { movieId, rating }) {
    const movie = state.movies.find(movie => movie.id === movieId);
    if (movie) {
      movie.rating = rating;
    }
  },
  
};

const actions = {
   updateRating({ commit, state }, { movieId, rating }) {
    commit('updateRating', { movieId, rating });
    if (rating === 0) {
      // Удаление оценки из локального хранилища
      const updatedMovies = state.movies.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, rating: 0 };
        }
        return movie;
      });
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
    } else {
      localStorage.setItem('movies', JSON.stringify(state.movies));
    }
  },


};

const getters = {

  isMovieRated: state => movieId => {
    const movie = state.movies.find(movie => movie.id === movieId);
    return movie ? movie.rating > 0 : false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
