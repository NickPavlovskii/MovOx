// store/modules/movies.js (путь может быть другим, в зависимости от структуры вашего проекта)
const state = {
    movies: [], // Your movie data here
    selectedSortOption: 'Сортировать по', // Initial value
    sortOrder: 'asc', // Initial value
  };
  
  const getters = {
    sortedMovies(state) {
      let moviesList = state.movies.slice(); // Clone the array to avoid mutating the original
  
      if (state.selectedSortOption !== 'Сортировать по') {
        moviesList.sort((a, b) => {
          const sortOption = state.selectedSortOption;
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
  
          if (state.sortOrder === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });
      }
  
      return moviesList;
    },
  };
  
  const mutations = {
    updateSortOrder(state, order) {
      state.sortOrder = order;
    },
  };
  
  export default {
    state,
    getters,
    mutations,
  };
  