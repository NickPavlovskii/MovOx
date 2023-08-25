import { createStore } from 'vuex';

// Функция для имитации асинхронного получения данных о фильмах
const fetchMoviesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moviesData = require('../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
};

// Функция для получения значения из LocalStorage
const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key)) || {};
};

// Функция для сохранения значения в LocalStorage
const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const store = createStore({
  state() {
    return {
      // Загрузка фильмов из JSON
      movies: require('../components/kinopoisk.json').docs,
      searchQuery: '',
      filteredMovies: [],
      ratings: getLocalStorageItem('ratings') || {}, // Структура для хранения оценок и закладок
    };
  },

  getters: {
     // Получение списка оцененных фильмов из ratings
     getRatedMovies: state => {
      const ratedMovies = [];
      for (const [key, value] of Object.entries(state.ratings)) {
        if (key.startsWith('rating_') && value === 'true') {
          const movieId = key.split('_')[1];
          const movie = state.movies.find(movie => movie.id === movieId);
          if (movie) {
            ratedMovies.push(movie);
          }
        }
      }
      return ratedMovies;
    },

    // Получение списка фильмов в закладках из ratings
    getBookmarkedMovies: state => {
      const bookmarkedMovies = [];
      for (const [key, value] of Object.entries(state.ratings)) {
        if (key.startsWith('bookmark_') && value === 'true') {
          const movieId = key.split('_')[1];
          const movie = state.movies.find(movie => movie.id === movieId);
          if (movie) {
            bookmarkedMovies.push(movie);
          }
        }
      }
      return bookmarkedMovies;
    },
    // Получение фильма по ID с учетом фильтрации
    getMovieById: (state) => (id) => {
      const moviesList = state.searchQuery ? state.filteredMovies : state.movies;
      return moviesList.find((movie) => movie.id === id);
    },
    // Проверка, оценен ли фильм пользователем
    isMovieRated: () => (movieId) => {
      const ratings = getLocalStorageItem('ratings');
      return Object.prototype.hasOwnProperty.call(ratings, `rating_${movieId}`);
    },
    isMovieBookmarked: () => (movieId) => {
      const ratings = getLocalStorageItem('ratings');
      return Object.prototype.hasOwnProperty.call(ratings, `bookmark_${movieId}`);
    },
  },
  mutations: {
    // Добавление оценки или закладки в ratings
    addRating(state, { key, value }) {
      state.ratings[key] = value;
      setLocalStorageItem('ratings', state.ratings);
    },

    // Удаление оценки или закладки из ratings
    removeRating(state, key) {
      delete state.ratings[key];
      setLocalStorageItem('ratings', state.ratings);
    },
    // Установка списка фильмов
    setMovies(state, movies) {
      state.movies = movies;
    },
    // Установка отфильтрованного списка фильмов
    setFilteredMovies(state, movies) {
      state.filteredMovies = movies;
    },
    // Установка поискового запроса
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    // Переключение "Лайка" фильма и обновление LocalStorage
    toggleLike(state, movieId) {
      const moviesList = state.searchQuery ? state.filteredMovies : state.movies;
      const index = moviesList.findIndex((movie) => movie.id === movieId);
      const ratings = getLocalStorageItem('ratings');
      if (index !== -1) {
        const movie = moviesList[index];
        movie.isLiked = !movie.isLiked;
        moviesList.splice(index, 1, movie);

        // Обновление оценки в LocalStorage
        if (movie.isLiked) {
          ratings[`rating_${movieId}`] = 'true';
        } else {
          delete ratings[`rating_${movieId}`];
        }
        setLocalStorageItem('ratings', ratings);
      }
    },
  },
  actions: {
    async toggleRating({ commit, getters }, { movieId, isLiked }) {
      const key = isLiked ? `rating_${movieId}` : `bookmark_${movieId}`;
      const action = isLiked ? 'addToRatings' : 'removeFromRatings';

      if (!getters.isMovieBookmarked(movieId)) {
        await commit(action, { key });
      }
    },

    async addToRatings({ commit}, { key }) {
      const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
      if (!Object.prototype.hasOwnProperty.call(ratings, key)) {
        ratings[key] = 'true';
        localStorage.setItem('ratings', JSON.stringify(ratings));
        commit('addRating', { key, value: 'true' });
      }
    },

    async removeFromRatings({ commit }, { key }) {
      const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
      if (Object.prototype.hasOwnProperty.call(ratings, key)) {
        delete ratings[key];
        localStorage.setItem('ratings', JSON.stringify(ratings));
        commit('removeRating', key);
      }
    },
    // Получение фильмов из JSON и установка списка
    async fetchMovies({ commit }) {
      const moviesData = await fetchMoviesData();
      commit('setMovies', moviesData);
    },
    // Поиск фильмов и установка отфильтрованного списка
    async searchMovies({ commit, state }) {
      const movies = await fetchMoviesData();
      const filteredMovies = movies.filter((movie) => {
        return movie.name.toLowerCase().includes(state.searchQuery.toLowerCase());
      });
      commit('setFilteredMovies', filteredMovies);
    },
  
  },
});

export default store;
