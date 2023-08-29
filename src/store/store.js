import { createStore } from 'vuex';
import sortingModule from './modules/sorting';
import ratings from './modules/ratings';
import bookmarks from './modules/bookmarks';
// Функция для имитации асинхронного получения данных о фильмах
const fetchMoviesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moviesData = require('../components/kinopoisk.json');
      resolve(moviesData.docs);
    }, 200);
  });
};



const store = createStore({
  modules: {
   sorting: sortingModule, 
   ratings,
   bookmarks
  },
  state() {
    return {
      itemsPerPage: 21,
      sortOptions: [
        { value: "Сортировать по", label: "Сортировать по" },
        { value: "year", label: "Год" },
        { value: "rating.kp", label: "Рейтинг" },
        { value: "movieLength", label: "Длительность" },
      ], 
      movies: require('../components/kinopoisk.json').docs,
      searchQuery: '',
      filteredMovies: [],
      rating: null,
    };
  },

  getters: {
    
    // Получение фильма по ID с учетом фильтрации
    getMovieById: (state) => (id) => {
      const moviesList = state.searchQuery ? state.filteredMovies : state.movies;
      return moviesList.find((movie) => movie.id === id);
    },
    // Проверка, оценен ли фильм пользователем
   
  },
  mutations: {
    SET_BOOKMARK(state, value) {
      state.isBookmarked = value;
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    updateSelectedSortOption(state, option) {
      state.selectedSortOption = option;
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
  
  },
  actions: {
   
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
