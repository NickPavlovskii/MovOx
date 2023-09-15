// store/modules/movie.js
const state = {
  rating: null,
  movies: require('../../components/kinopoisk.json').docs,
  searchQuery: '',
  filteredMovies: [],
  itemsPerPage: 21,
};

// Функция для имитации асинхронного получения данных о фильмах
const fetchMoviesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moviesData = require('../../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
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


      // Получение фильмов из JSON и установка списка
      async fetchMovie({ commit }) {
        const moviesData = await fetchMoviesData();
        commit('setMovies', moviesData);
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
