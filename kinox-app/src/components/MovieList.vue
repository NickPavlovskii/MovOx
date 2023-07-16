<template>

     <ContentWrapper v-if = "this.$route.path === '/search'" class="ContentWrapper" /> 
    <div class="container movieList">
      
      
      <h2 class="container_title" v-if="!searchQuery">Наша коллекция</h2>
  
       
       
   
  
      <div class="sort-options">
        <Dropdown
          :class="['custom-dropdown', 'w-full', 'md:w-14rem', 'p-dropdown-indigo']"
          v-model="selectedSortOption"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          @change="sortMovies"
          placeholder="Сортировать по"
          class="custom-dropdown w-full md:w-14rem"
        ></Dropdown>
        <font-awesome-icon
          icon="arrow-up-9-1"
          v-if="sortOrder === 'asc'"
          @click="updateSortOrder('desc')"
          class="icon_select"
        />
        <font-awesome-icon
          icon="arrow-up-1-9"
          v-else
          @click="updateSortOrder('asc')"
          class="icon_select"
        />
      </div>
  
      <ul class="movie-list">
        <li v-for="(movie, index) in displayedMovies" :key="movie.id" :class="{'movie-item': true, 'new-row': index % 5 === 0}">
          <MovieCard :movie="movie" />
        </li>
      </ul>
  
      <div class="pagination">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="setCurrentPage(pageNumber)"
          :class="{'active': pageNumber === currentPage}"
          class="page-button"
        >
          {{ pageNumber }}
        </button>
      </div>
      <div class="jump-pagination">
    <button
      v-for="pageNumber in totalJumpPages"
      :key="pageNumber"
      @click="setCurrentPage((pageNumber - 1) * 5 + 1)"
      class="jump-button"
    >
      {{ (pageNumber - 1) * 5 + 1 }}-{{ Math.min(pageNumber * 5, totalPages) }}
    </button>
  </div>
    </div>
  </template>
  
  <script>

  import { mapState, mapActions, mapGetters } from 'vuex';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faArrowUp91, faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
  import MovieCard from './MovieCard.vue';
  import Dropdown from 'primevue/dropdown';
  import ContentWrapper from './main/ContentWrapper.vue';
  library.add(faArrowUp91);
  library.add(faArrowUp19);
  
  export default {
    components: {
      FontAwesomeIcon,
      ContentWrapper,
      MovieCard,
      Dropdown,
    },
    data() {
      return {
        itemsPerPage: 21,
        currentPage: 1,
        sortOptions: [
          { value: 'Сортировать по', label: 'Сортировать по' },
          { value: 'year', label: 'Год' },
          { value: 'rating.kp', label: 'Рейтинг' },
          { value: 'movieLength', label: 'Длительность' },
        ],
        selectedSortOption: 'Сортировать по',
        sortOrder: 'asc',
        isLoading: false,
      };
    },
    computed: {
      ...mapState(['filteredMovies', 'searchQuery', 'movies']),
      ...mapGetters(['getMovieById']),
      totalMovies() {
        return this.$route.path === '/' ? this.movies.length : this.filteredMovies.length;
      },
      totalPages() {
        return Math.ceil(this.totalMovies / this.itemsPerPage);
      },
      totalJumpPages() {
        return Math.ceil(this.totalPages / 5);
      },
      displayedMovies() {
        const moviesList = this.$route.path === '/' ? this.movies : this.filteredMovies;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return moviesList.slice(startIndex, startIndex + this.itemsPerPage);
      },
      shouldShowLoadMoreButton() {
        return this.currentPage * this.itemsPerPage < this.totalMovies;
      },
    },
    mounted() {
      this.searchMovies();
      this.$store.dispatch('movies/fetchMovieList');
    },
    methods: {
     
      ...mapActions(['fetchMovies', 'searchMovies']),
      handleEnter() {
        if (event.key === 'Enter') {
          this.updateMovieList();
        }
      },
      navigateToLikePage() {
        this.$router.push({ name: 'bookmarks-ratings' });
      },
      updateSortOrder(order) {
        this.sortOrder = order;
        this.sortMovies();
      },
      sortMovies() {
        const moviesList = this.$route.path === '/' ? this.movies : this.filteredMovies;
        moviesList.sort((a, b) => {
          const aValue = a[this.selectedSortOption];
          const bValue = b[this.selectedSortOption];
          if (this.sortOrder === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });
        this.setCurrentPage(1);
      },
      setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
      },
      loadMore() {
        this.currentPage++;
      },
      performSearch(query) {
        this.$store.commit('setSearchQuery', query);
        this.currentPage = 1;
        this.setCurrentPage(1);
      },
      setSortOrder(order) {
        this.sortOrder = order;
      },
      async searchMovies() {
        this.isLoading = true;
        await this.$store.dispatch('searchMovies');
        this.isLoading = false;
      },
      async fetchMovieData() {
        const movieId = this.$route.params.id;
        this.movie = this.getMovieById(movieId);
        if (!this.movie) {
          await this.$store.dispatch('fetchMovie', movieId);
          this.movie = this.getMovieById(movieId);
        }
      },
    },
    created() {
      this.fetchMovieData();
    },
  };
  </script>
  
  
  <style scoped>
.custom-dropdown{
 width: 200px;

 color: #fff;
}
.shapes{
  box-sizing: border-box;
flex-shrink: 0;
width: 1px;
height: 400px;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
padding: 100px 100px 100px 100px;

overflow: visible;
flex: 1 0 0px;
position: relative;
align-content: center;
flex-wrap: nowrap;
border-radius: 0px 0px 0px 0px;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;

  color: #fff;
}
.container_title{
  display: flex; 
  justify-content: center;
  letter-spacing: 0.1em;
  font-family: cursive;
}
.sort-options {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.icon_select{
position: relative;
top: 2px;
  width: 40px;
  font-size: 21px;
  justify-items: center;
}
label {
  font-size: 16px;
  margin-right: 10px;
}

select {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #8cacc4;
  box-shadow: 0 0 0 2px rgba(140, 172, 196, 0.2);
}

option {
  font-size: 16px;
}
.row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 20px;
    position: relative;
    bottom: 25px;
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
.icons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 10px;
  }





 

 

 

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: #333;
}
.pagination {
    
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 9999;
}
.jump-pagination{
  z-index: 3;
}

.page-button {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #f7f7f7;
}

.page-button:hover {
  background-color: #e1e1e1;
}

.page-button.active {
color: #fff;
  background: linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%);
}
.jump-button {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  color: #fff;
  background: #020c1b;
}

.jump-button:hover {
  background-color: #e1e1e1;
}





.ContentWrapper {
  text-align: center;
  margin: 0 auto;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: -30px;
}

.movie-item {
z-index: 2;
  padding: 10px;

}

.movie-poster {
  text-align: center;
  border-radius: 8px;
  margin-left: -30px;
}



.poster-image {
  max-width: 100%;
  height: auto;
  border-radius: 11px;
}

.movie-details {
  padding-top: 10px;
  width: 100%;
  color: white;
  height: 80px;
}

.movie-name {
  font-size: 19px;
  margin-bottom: 5px;
  position: relative;
  bottom: 90px;

  font-weight: bold;
}

.movie-info {
  display: flex;
  align-items: center;
}



.year {
  font-size: 16px;
  color: #888;
  position: relative;
  bottom: 85px;
}


</style>