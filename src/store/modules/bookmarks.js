
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
            // console.log('toggleBookmark action triggered');
            
            const newBookmarkValue = !state.isBookmarked;
            // console.log('newBookmarkValue:', newBookmarkValue);
          
            commit('SET_BOOKMARK', newBookmarkValue);
          
            if (newBookmarkValue) {
              localStorage.setItem('isBookmarked', 'true');
            //   console.log('Bookmark set in local storage');
            } else {
              localStorage.removeItem('isBookmarked');
            //   console.log('Bookmark removed from local storage');
            }
          },
    },
  };