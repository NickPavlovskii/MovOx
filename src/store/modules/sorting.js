// store/modules/sorting.js
export default {
  state: {
    movies: [],
    currentPage: 0,
    selectedSortOption: 'Сортировать по', // Текущий выбранный вариант сортировки
    sortOrder: 'asc', // Текущий порядок сортировки
    sortOptions: [
      { value: "Сортировать по", label: "Сортировать по" },
      { value: "year", label: "Год" },
      { value: "rating.kp", label: "Рейтинг" },
      { value: "movieLength", label: "Длительность" },
    ], 
  },
  getters: {
    currentSortOrder(state) {
      return state.sortOrder;
    },

    async fetchMovies({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/movies/'); // Это отправит GET-запрос на сервер
        const moviesData = await response.json();
        commit('setMovies', moviesData);
      } catch (error) {
        console.error(error);
      }
    },
    sortedMovies(state) {
      const moviesList = state.movies.slice(); 
      const sortOption = state.selectedSortOption;
      const sortOrder = state.sortOrder;

      if (sortOption !== 'Сортировать по') {
        moviesList.sort((a, b) => {
          let aValue, bValue;

          if (sortOption === 'year') {
            aValue = a.year;
            bValue = b.year;
          } else if (sortOption === 'rating.kp') {
            aValue = a.rating.kp;
            bValue = b.rating.kp;
          } else if (sortOption === 'movieLength') {
            aValue = a.movieLength;
            bValue = b.movieLength;
          }

          if (sortOrder === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });
      }

      return moviesList;
    },
  },
  mutations: {
     setMovies(state, movies) {
    state.movies = movies;
  },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    updateSelectedSortOption(state, option) {
      state.selectedSortOption = option;
    },
    sortOptions(state, sortoption){
      state.sortOptions = sortoption;
    }
  },
};
