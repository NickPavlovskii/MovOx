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
      <Paginator
      v-model:first="currentPage "
      :rows="1"
      :totalRecords="totalPages"
    
    />
</div>
    

    </div>
  </template>


  
  <script>

import Paginator from 'primevue/paginator';
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
      Paginator
    },
    data() {
      return {
        itemsPerPage: 21,
        currentPage: 0,
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
 
      totalPages() {
        return Math.ceil(this.totalMovies / this.itemsPerPage);
      },
      
      displayedMovies() {
      const moviesList = this.$route.path === '/' ? this.movies : this.filteredMovies;
      const startIndex = (this.currentPage ) * this.itemsPerPage;
      return moviesList.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalMovies() {
      const moviesList = this.$route.path === '/' ? this.movies : this.filteredMovies;
      return moviesList.length;
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
      onPageChange(pageNumber) {
      this.currentPage = pageNumber;
    },
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
      setCurrentPage(event) {
      this.currentPage = event.page + 1;
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


.pagination {
    
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 9999;
}


.ContentWrapper {
  text-align: center;
  margin: 0 auto;
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




</style>