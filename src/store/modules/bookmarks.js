// store/modules/bookmarks.js
const state = {
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    isBookmarked: false,
  };
  
  const mutations = {
    addToBookmarks(state, movieId) {
      if (!state.bookmarks.includes(movieId)) {
        state.bookmarks.push(movieId);
        localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
      }
    },
    removeFromBookmarks(state, movieId) {
      const index = state.bookmarks.indexOf(movieId);
      if (index !== -1) {
        state.bookmarks.splice(index, 1);
        localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
      }
    },
  };
  
  const actions = {
    toggleBookmark({ commit, state }, movieId) {
      if (state.bookmarks.includes(movieId)) {
        commit('removeFromBookmarks', movieId);
      } else {
        commit('addToBookmarks', movieId);
      }
    },
  };
  
  const getters = {
    isMovieBookmarked: state => movieId => {
      return state.bookmarks.includes(movieId);
    },
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  