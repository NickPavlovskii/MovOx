
// store/modules/bookmarks.js
export default {
    state: {
     isBookmarked: false,
    },
    mutations: {
      SET_BOOKMARK(state, val) {
        state.isBookmarked = val;
      },
    },
    actions: {
        toggleBookmark({ commit, state }) {
            const newBookmarkValue = !state.isBookmarked;
            commit('SET_BOOKMARK', newBookmarkValue);
          
            if (newBookmarkValue) {
              localStorage.setItem('isBookmarked', 'true');
            } else {
              localStorage.removeItem('isBookmarked');
            }
          },
    },
  };