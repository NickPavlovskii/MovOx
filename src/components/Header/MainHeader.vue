<template>
  <header class="header" :class="{ active: isMenuOpen }">
    <div class="headerContent">
      <!-- Logo -->
      <router-link to="/" style="text-decoration: none; color: white;">
        <div class="logo">
          <img src="../../assets/Icon.png" alt="" />
        </div>
      </router-link>


      <div class="group">
        <!-----------------------------------------------menuItems -------------------------------------------------->
        <ul class="menuItems">
          <li>
            <router-link :to="{ path: '/movie' }" class="menuItem">
              <a>Фильмы</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/tv-series' }" class="menuItem">
              <a>Сериалы</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/cartoon' }" class="menuItem">
              <a>Мультфильмы</a>
            </router-link>
          </li>

          <li class="menuItem bookmarksItem">
            <font-awesome-icon icon="bookmark" class="Bookmark" v-if="!isSearchActive" @click="navigateToLikePage" />
          </li>
          <li class="bookmarksLink">
            <router-link :to="{ path: '/bookmarks-ratings' }" class="menuItem">
              <a>Смотреть позже</a>
            </router-link>
          </li>
        </ul>
        <!-----------------------------------------------search-------------------------------------------------->
        <div class="search">
          <span class="icon">
            <font-awesome-icon 
            icon="search" 
            class="searchBtn" 
            v-if="!isSearchActive" 
            @click="toggleSearch" 
            />
            <font-awesome-icon 
            icon="close" 
            class="closeBtn" 
            v-if="isSearchActive" 
            @click="toggleSearch" 
            />
          </span>
        </div>
        <!-----------------------------------------------searchBox-------------------------------------------------->
        <div class="searchBox" :class="{ active: isSearchActive }">
          <AutoComplete 
          @keydown.enter="handleEnter" 
          class="input" 
          v-model="searchQuery" 
          :suggestions="filteredMoviesList"
          @input="handleInput" 
          @blur="handleBlur"
          >
            <template #option="{ option }">
              <router-link 
              style=" display: flex; text-decoration: none; color: #000;"
              :to="{ name: 'movie-details', params: { id: option.id } }" 
              @click="clearSearchQuery"
              >
                <img 
                :src="option.poster.url" 
                alt="Постер фильма" 
                class="dropdown-image"
                >
                <div class="dropdown-info">
                  <h3 class="dropdown-name">{{ option.name }}</h3>
                  <p class="dropdown-shortDesc">{{ option.shortDescription }}</p>
                  <div class="row">
                    <div class="info">
                      <div class="infoItem dropdown-movieLength">
                        <span class="text bold"><i class="pi pi-clock"></i></span>
                        <span class="text">{{ convertMinutesToHours(option.movieLength) }}</span>
                      </div>
                      <div class="infoItem">
                        <span class="text bold"><i class="pi pi-calendar"></i></span>
                        <span class="text">{{ option.year }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </template>
          </AutoComplete>
        </div>
        <!-----------------------------------------------mobileMenu-------------------------------------------------->
        <div class="mobileMenu" :class="{ active: show }" @click="toggleMenu">
          <div class="toggleMenu">
            <span class="line top" :class="{ active: show }"></span>
            <span class="line middle" :class="{ active: show }"></span>
            <span class="line bottom" :class="{ active: show }"></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import AutoComplete from 'primevue/autocomplete';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars, faClose, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { mapState, mapActions, mapMutations } from 'vuex';

library.add(faSearch);
library.add(faBars);
library.add(faClose);
library.add(faBookmark);
library.add(faHeart);

export default {
  components: {
    FontAwesomeIcon,
    AutoComplete
  },

  data() {
    return {
      isSearchActive: false,
      showResults: false,
      searchQuery: '',
      isMenuOpen: false,
    };
  },

  computed: {
    ...mapState([
      'movies',
      'searchQuery',
      'filteredMovies'
    ]),

    filteredMoviesList() {
      return this.filteredMovies.slice(0, 3);
    },
  },

  methods: {
    ...mapActions(['searchMovies']),
    ...mapMutations(['setSearchQuery']),
    toggleResults() {
      this.showResults = !this.showResults;
    },
    // Convert minutes to hours and minutes format
    convertMinutesToHours(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    },
    handleInput() {

      const delayInMilliseconds = 500;

      // Обнуляем предыдущий таймер, чтобы избежать ненужных вызовов
      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      // Запускаем новый таймер с задержкой
      this.timerId = setTimeout(() => {
        this.showResults = true;
        this.setSearchQuery(this.searchQuery);
        this.searchMovies();
      }, delayInMilliseconds);
    },


    handleEnter() {
      if (event.key === 'Enter') {
        this.$router.push({ path: `/search` });
      }
    },
    clearSearchQuery() {
      this.searchQuery = ''; // Очистка значения searchQuery
    },
    handleBlur() {
      this.showResults = false;
    },
    selectMovie(movie) {
      this.searchQuery = movie.name;
      this.showResults = false;
      this.$router.push({ path: `/movie/${movie.id}` });
    },

    navigateToLikePage() {
      this.$router.push({ name: 'bookmarks-ratings' });
    },
    // Perform the movie search
    performSearch() {
      this.searchMovies();
      this.$emit('search', this.searchQuery);
    },
    // Toggle the search box
    toggleSearch() {
      this.isSearchActive = !this.isSearchActive;
    },
    // Toggle the menu
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  mounted() {
    this.searchMovies();
  },
};
</script>


<style lang="scss" scoped>
.text {
  margin-right: 5px;
  opacity: 0.5;
  line-height: 24px;
}



.row {
  display: flex;
  gap: 25px;
  position: relative;
  bottom: 10px;
}

.info {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;
  display: flex;
}

.info .infoItem {
  margin-right: 10px;
  display: flex;
  flex-flow: row wrap;

}


.dropdown-image {
  width: 35%;
  margin-right: 6px;
}

.dropdown-name {}

.dropdown-shortDesc {

  white-space: wrap;
}

.mobileMenu {
  cursor: pointer;
  display: inline-block;
  color: white;
}

.toggleMenu {
  position: relative;
  width: 30px;
  height: 20px;
  transform: rotate(0deg);
  transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.line {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #333;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),
    opacity 0.3s ease;
}

.top {
  top: 0;
}

.middle {
  top: 8px;
}

.bottom {
  top: 16px;
}

.active .top {
  transform: translateY(8px) rotate(45deg);
}

.active .middle {
  opacity: 0;
}

.active .bottom {
  transform: translateY(-8px) rotate(-45deg);
}

/* Header */
.header {
  font-family: cursive;
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #020c1b99;
  color: white;
  display: flex;
  align-items: center;
  z-index: 5;


  &.active {
    background-color: #020c1b;
  }
}

/* Header Content */
.headerContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 180px;
    margin-left: 30px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
    font-family: cursive;
  }
}


.group {
  display: flex;
  margin-right: 50px;

  .bookmarks_icon {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .menuItem {
      margin-left: 10px;
    }
  }
}

.bookmarksLink {
  display: none;
}

/* Search icon */
.search {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 1.1em;
  cursor: pointer;

  .searchBtn {
    position: relative;
  }

  .closeBtn {
    position: relative;
    align-items: center;
    top: 5px;
    transition: 0.5s ease-in-out;
  }
}



/* Search box */
.searchBox {
  position: absolute;
  right: -120%;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 30px;
  transition: 0.5s ease-in-out;
  align-items: center;

  /* Show search box when active */
  &.active {
    right: 0;
  }
}


/* Menu items */
.menuItems {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-left: auto;

  .menuItem {
    margin-right: 15px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    list-style: none;

    a {
      position: relative;
      letter-spacing: 0.2em;
      font-size: 1em;

      /* Add underline effect on hover */
      &:hover::before {
        transform: scaleX(1);
        transform-origin: left;
      }

      /* Underline animation */
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: white;
        bottom: -3px;
        transform: scaleX(0);
        transition: transform 0.5s ease-in-out;
        transform-origin: right;
      }
    }
  }
}

.toggleMenu {
  display: none;
}

@media (max-width: 768px) {
  .dropdown-movieLength .text {
    display: none;
  }

  .dropdown-shortDesc {
    display: none;
  }

  .bookmarksLink {
    display: block;
  }

  .bookmarksItem {
    display: none;
  }

  .mobileMenuItems {
    display: none;
    width: 100%;
  }

  .header .menuItems {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    left: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .header.active .menuItems {
    top: 60px;
    opacity: 1;
    visibility: visible;
    left: 0;
    display: flex;
    flex-direction: column;
    background: #020c1b;
    width: 100%;
    height: 170%;
    margin: 0;
    transform: translateY(-10px);
  }

  .menuItem {
    margin: 10px 25px;
  }

  .mobileMenuItems .menuItem {
    margin-right: 10px;
  }


  .bookmarks_icon {
    .menuItem {
      display: none;
    }
  }

  .mobileMenu {
    cursor: pointer;
    display: inline-block;
    color: white;
  }

  .toggleMenu {
    position: relative;
    width: 26px;
    height: 12px;
    transform: rotate(0deg);
    transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    top: 2px;
  }

  .line {
    display: block;
    position: absolute;
    height: 3px;
    width: 80%;
    background: #fff;
    border-radius: 2px;
    left: 0;
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),
    opacity 0.9s ease;
    color: white;
  }

  .top {
    top: 0;
    color: white;
  }

  .middle {
    top: 8px;
  }

  .bottom {
    top: 16px;
  }

  .active .top {
    transform: translateY(8px) rotate(45deg);
  }

  .active .middle {
    opacity: 0;
  }

  .active .bottom {
    transform: translateY(-8px) rotate(-45deg);
  }

  .searchBox {
    bottom: 1px;

    &.active {
      right: 40px;
    }

  }

  .closehBtn {
    position: relative;
    margin-bottom: 5px;

  }

  .toggleMenu.active {
    margin-top: 5px;
  }

  .toggleMenu {
    display: block;

  }

  .header .menuItems {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    left: 100%;
  }

  .header.active .menuItems {
    // align-items: flex-start;
    top: 60px;
    opacity: 1;
    visibility: visible;
    left: 0;
    display: flex;
    flex-direction: column;
    background: #020c1b;
    width: 100%;
    height: 180%;
    margin: 0;
    transition: transform 0.5s ease-in-out;

    .menuItem {
      margin: 10px 25px;
    }
  }

  .mobileMenu {
    margin-left: 20px;
  }

  .searchBtn {
    left: 0;
  }
}
</style>
