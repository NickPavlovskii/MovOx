// store/modules/movie.js
const state = {
  rating: null,
  movies: [],
  searchQuery: '',
  filteredMovies: [],
  itemsPerPage: 21,
};




const mutations = {
     // Установка списка фильмов
  setMovies(state, movies) {
    state.movies = movies;
  },
  updateRating(state, { movieId, rating }) {
    const movie = state.movies.find(movie => movie.id === movieId);
    if (movie) {
      movie.rating = rating;
    }
  },

 
    // Установка отфильтрованного списка фильмов
    setFilteredMovies(state, movies) {
      state.filteredMovies = movies;
    },
    // Установка поискового запроса
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
};

const actions = {


  async fetchMovies({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/movies/'); // Это отправит GET-запрос на сервер
      const moviesData = await response.json();
      commit('setMovies', moviesData);
    } catch (error) {
      console.error(error);
    }
  },
      // Поиск фильмов и установка отфильтрованного списка
      async searchMovies({ commit, state }) {
        const movies = state.movies; // Извлекаем фильмы из состояния
        const filteredMovies = movies.filter((movie) => {
          return movie.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        });
        commit('setFilteredMovies', filteredMovies);
      },
    
 
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
  
    // Получение фильма по ID с учетом фильтрации
    getMovieById: (state) => (id) => {
      const moviesList = state.searchQuery ? state.filteredMovies : state.movies;
      return moviesList.find((movie) => movie.id === id);
    },
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
