<template>
  <header class="header" :class="{ active: isMenuOpen }"> 
    <div class="headerContent">
      <router-link to="/" style="text-decoration: none; color: white;">
        <div class="logo">
          <img src="../../assets/Icon2.png" alt="" />
          <p>KinOx</p>
        </div>
      </router-link>
     

      <div class="group">
        <ul class="menuItems">
          <li>
  <router-link :to="{ path: '/movie' }" class="menuItem">
    <a>Фильмы</a>
  </router-link>
</li>
<li class="menuItem">
  <router-link :to="{ path: '/cartoon' }" class="menuItem">
    <a>Мультфильмы</a>
  </router-link>
</li>

<li class="menuItem">
<font-awesome-icon
              icon="bookmark"
             class="Bookmark"
              v-if="!isSearchActive"
              click="navigateToLikePage"
            />
          </li>
        </ul>
        
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

        <div class="searchBox" :class="{ active: isSearchActive }">
    <input type="text" placeholder="Search here..." v-model="searchQuery"  @keyup.enter="performSearch" />
  </div>

        <div class="mobileMenu">
          <font-awesome-icon icon="bars" class="toggleMenu" @click="toggleMenu" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faBars, faClose, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { mapState, mapActions } from 'vuex';

library.add(faSearch)
library.add(faBars)
library.add(faClose)
library.add(faBookmark)
library.add(faHeart)

export default {
  components: {
    FontAwesomeIcon,
  },

  data() {
    return {
      isSearchActive: false,
      searchQuery: '',
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(['movies', 'searchQuery', 'filteredMovies']), // Добавить filteredMovies в computed
  },

  methods: {
    ...mapActions(['searchMovies']),
    navigateToLikePage() {
      this.$router.push({ name: 'bookmarks-ratings' });
    },
    performSearch() {
      this.searchMovies(); // Вызвать действие searchMovies для обновления filteredMovies в хранилище
      this.$emit('search', this.searchQuery); // Эмитировать событие 'search' с переданным значением поискового запроса
    },

    toggleSearch() {
      this.isSearchActive = !this.isSearchActive;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  mounted() {
    this.searchMovies();
  },
}
</script>



<style lang="scss" scoped>
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
}

.header.active {
  background-color: #020c1b;
}

.headerContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo {
  
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  img {
    height: 70px;
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

.search {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 1.1em;
  cursor: pointer;
}

.searchBtn {
  position: relative;
}

.closehBtn {
  position: relative;
  align-items: center;
  top: 5px;
  transition: 0.5s ease-in-out;
}

.searchBox {
  position: absolute;
  right: -120%;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 30px;
  transition: 0.5s ease-in-out;
  align-items: center;
}

.searchBox.active {
  right: 0;
}

.searchBox input {
  width: 100%;
  border: none;
  outline: none;
  height: 40px;
  font-size: 1em;
  background: #04152d;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  color: white;
  margin-left: 70%;
  padding-left: 15px;
  border-radius: 12px;
}

.menuItems {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-left: auto;
}

.menuItem {
  margin-right: 15px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  list-style: none;
}

.menuItem a {
  position: relative;
  letter-spacing: 0.2em;
  font-size: 1em;
}

.menuItem a::before {
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

.menuItem a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.mobileMenuItems {
  display: none;
  width: 100%;
}



.mobileMenuItems .menuItem {
  margin-right: 10px;
}

.searchBar {}

.bookmarks_icon {
  .menuItem {
    display: none;
  }
}
.toggleMenu{
display: none;
  }
@media (max-width: 768px) {

  .searchBox {
 bottom: 1px;
&.active{
  right: 40px;
}
 
}

.closehBtn{
position: relative;
margin-bottom: 5px;

}
.toggleMenu.active{
  margin-top: 5px;
}

  .toggleMenu{
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
    height: 150%;
    margin: 0;

    .menuItem{
      margin: 10px 25px;
    }
  }

  .mobileMenu {
    margin-left: 20px;
  }

  .searchBtn {
    left: 0;
  }




  .searchBar {
  }

  .bookmarks_icon {
    .menuItem {
      display: none;
    }
  }
}
</style>
