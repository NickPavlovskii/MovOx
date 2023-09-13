// store/modules/sorting.js
export default {
  state: {
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
    sortedMovies(state, getters, rootState) {
      const moviesList = rootState.movies.slice(); 
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
