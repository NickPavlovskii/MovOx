<template>
  <ContentWrapper v-if = "this.$route.path === '/search'" class="ContentWrapper" /> 
 <div class="container movieList">
   <div v-if="this.$route.path === '/'">
   <h2 class="container_title" >Наша коллекция</h2>
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
   <ul  class="movie-list">
     <li 
     v-for="(movie) in moviess" 
     :key="movie.id" 
     :class="{'movie-item': true, }"
     >
       <MovieCard :movie="movie" />
     </li>
   </ul>
   
 </div>
 <div v-else-if="this.$route.path === '/search'">
   <h2 class="container_title" >Вы искали</h2>
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
   
   <ul  class="movie-list ">
     <li 
      v-for="(movie) in displayedMovies" 
      :key="movie.id" 
      :class="{'movie-item': true}"
     >
       <MovieCard :movie="movie" />
     </li>
   </ul>
 </div>
 <div class="pagination">
   <Paginator
   :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
            }"
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
   ...mapState([
    'filteredMovies', 
    'searchQuery', 
    'movies'
  ]),
   ...mapGetters(['getMovieById']),

   totalPages() {
     return Math.ceil(this.totalMovies / this.itemsPerPage);
   },
   
   moviess(){
    const sortedMovies = this.sortMovie();

// Calculate the starting index of the current page
const startIndex = this.currentPage * this.itemsPerPage;

// Return a subset of the sorted movies as per pagination
return sortedMovies.slice(startIndex, startIndex + this.itemsPerPage);
   },
   displayedMovies() {
    const sortedMovies = this.sortMovie();

// Calculate the starting index of the current page
const startIndex = this.currentPage * this.itemsPerPage;

// Return a subset of the sorted movies as per pagination
return sortedMovies.slice(startIndex, startIndex + this.itemsPerPage);
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
    this.fetchMovies(); 
    this.searchMovies();
  },
 methods: {
  
   ...mapActions(['fetchMovies', 'searchMovies']),
   sortMovie() {
      let moviesList = this.$route.path === '/' ? this.movies : this.filteredMovies;

      if (this.selectedSortOption !== 'Сортировать по') {
        // Custom sorting function based on selectedSortOption and sortOrder
        moviesList.sort((a, b) => {
          const sortOption = this.selectedSortOption;
          let aValue, bValue;

          // Extract the values to compare from the movie objects
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

          // Compare the values based on the sort order
          if (this.sortOrder === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });
      }

      return moviesList;
    },
    updateSortOrder(order) {
      this.sortOrder = order;
      this.currentPage = 0; // Reset the current page to the first page
    },
  
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

    getPropertyValue(obj, propertyPath) {

      const pathArray = propertyPath.split('.');
      return pathArray.reduce((currentObj, key) => {
        return currentObj ? currentObj[key] : undefined;
      }, obj);
    },

   setCurrentPage(event) {
   this.currentPage = event.page + 1;
 },
   loadMore() {
     this.currentPage++;
   },
   performSearch(query) {
   this.setSearchQuery(query);
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