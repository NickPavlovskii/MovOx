<template>
  <div class="container">
    <div class="title_container">
      <h2 class="title" v-if="this.$route.path === '/movie'" >Фильмы</h2>
      <h2 class="title" v-if="this.$route.path === '/cartoon'" >Мультфильмы</h2>
      <h2 class="title" v-if="this.$route.path === '/tv-series'" >Сериалы</h2>
      <h2 class="title" v-if="this.$route.path === '/Комедия'" >Комедии</h2>
      
 
    <div class="sort-options">
      <Dropdown 
      :class="['custom-dropdown', 'w-full', 'md:w-14rem', 'p-dropdown-indigo']"
      v-model="selectedSortOption" 
      :options="sortOptions" 
      optionLabel="label" 
      optionValue="value" 
      @change="sortMovies" 
      placeholder="Сортировать по" 
      class=" custom-dropdown w-full md:w-14rem">
    </Dropdown>

<font-awesome-icon icon="arrow-up-9-1" v-if="sortOrder === 'asc'" @click="updateSortOrder('desc')" class="icon_select" />
<font-awesome-icon icon="arrow-up-1-9" v-else @click="updateSortOrder('asc')" class="icon_select"/>
    </div>
   



  </div>
    <ul class="movie-list">
      <li v-for="(movie, index) in displayedMovies"  :key="movie.id" :class="{'movie-item': true, 'new-row': index % 5 === 0} " >

       <router-link :movie="movie"  :to="{ name: 'movie-details', params: { id: movie.id }}" style="cursor: pointer; text-decoration: none; list-style-type: none;">
       <div  style="cursor: pointer; text-decoration: none; list-style-type: none; display: flex;">
      
      
      <div class="movie-poster">
        <img :src="movie.poster.url" alt="Постер фильма" class="poster-image">
        <div class="movie-details">
        <circle-progress
          class="circle_progress"
          :viewport="true"
          :on-viewport="movie.rating.kp.toFixed(1)"
          :size="60"
          :background="'white'"
          :is-gradient="true"
          :percent="movie.rating.kp * 10"
          :gradient="{
            angle: 90,
            startColor: '#ff0000',
            stopColor: '#ffff00'
          }"
          :is-bg-shadow="true"
          :bg-shadow="{
            inset: true,
            vertical: 2,
            horizontal: 2,
            blur: 4,
            opacity: .4,
            color: '#000000'
          }"
          :border-width="5"
          :border-bg-width="5"
        ></circle-progress>
        <span class="ratingtext">{{ movie.rating.kp.toFixed(1) }}</span>
      </div>
      </div>
      
 
    <div style="cursor: pointer; text-decoration: none; list-style-type: none; color: white">
      <h2 class="movie-name">{{ movie.name }}</h2>
      <p>{{ movie.description }}</p>
      <div class="row">
              <div class="info">
                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="clock" /></span>
                  <span class="text">{{ convertMinutesToHours(movie.movieLength) }}</span>
                </div>
                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="calendar-days" /></span>
                  <span class="text">{{ movie.year }}</span>
                </div>
              </div>
            </div>
    </div>






       </div>
      </router-link>

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



//core
import "primevue/resources/primevue.min.css";

import { mapState, mapActions } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faHeart,faArrowUp91,faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
import CircleProgress from "vue3-circle-progress";
// import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';

library.add(faArrowUp91);
library.add(faArrowUp19);
library.add(faBookmark);
library.add(faHeart);

export default {
  components: {
    FontAwesomeIcon,
    CircleProgress,
    Dropdown,
    // Paginator,
  },
  data() {
    return {
      
      itemsPerPage: 10,
      currentPage: 1,
      sortOptions: [
      { value: 'Сортировать по', label: 'Сортировать по' },
        { value: 'year', label: 'Год' },
        { value: 'rating.kp', label: 'Рейтинг' },
        { value: 'movieLength', label: 'Длительность' }
      ],
      selectedSortOption: 'Сортировать по',
      sortOrder: 'asc',
      isLoading: false
    };
  },
  computed: {
    ...mapState(['movies', 'searchQuery']),
  
    filteredM() {
      return this.movies.filter(movie => {
    if (this.$route.path === '/movie') {
      return movie.type === 'movie' ;
    } else if (this.$route.path === '/cartoon') {
      return movie.type === 'cartoon' && 'animated-series'
    }
    else if (this.$route.path === '/tv-series') {
      return movie.type === 'tv-series';
    }
    else if (this.$route.path === '/Комедия') {
      return movie.genres.includes('Комедия');  

    }
    return false; // Если путь не соответствует ни '/movies/movie', ни '/movies/cartoon'
  });
    },
    
    totalMovies() {
      return this.movies.length;
    },
  // movies() {
  //     // Access the movie list from the Vuex store
  //     return this.$store.state.movies.movieList;
  //   },
    totalPages() {
      return Math.ceil(this.filteredM.length / this.itemsPerPage);
    },
    totalJumpPages() {
      return Math.ceil(this.totalPages / 5);
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredM.slice(startIndex, startIndex + this.itemsPerPage);
    },
    shouldShowLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredM.length;
    },
  },
  methods: {
    ...mapActions(['searchMovies', 'searchQuery']),
    
    updateDisplayedMovies() {
      this.displayedMovies = this.movies.slice(this.startIndex, this.endIndex + 1);
    },
    // Обработчик изменения страницы
  

    convertMinutesToHours(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    },
    sortMovies() {
  this.displayedMovies.sort((a, b) => {
    const aValue = this.getPropertyValue(a, this.selectedSortOption);
    const bValue = this.getPropertyValue(b, this.selectedSortOption);
    if (this.sortOrder === 'asc') {
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      } else {
        return aValue - bValue;
      }
    } else {
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return bValue.localeCompare(aValue);
      } else {
        return bValue - aValue;
      }
    }
  });
},
updateSortOrder(order) {
  this.sortOrder = order;
  this.sortMovies();
},


getPropertyValue(object, path) {
  const keys = path.split('.');
  let value = object;
  for (const key of keys) {
    value = value[key];
  }
  return value;
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
    },
    setSortOrder(order) {
      this.sortOrder = order;
    },
    async searchMovies() {
      this.isLoading = true;
      await this.$store.dispatch('searchMovies');
      this.isLoading = false;
    },
  },
  mounted() {
    this.searchMovies();
    
  },
};
</script>


<style scoped>



/* -------------------- */
.custom-dropdown::after {
    border-top-color: white; /* Цвет стрелки */
  }
.custom-dropdown{

 height: 50px;
}
.p-component{
height: 50px;
}

.text {
   
   margin-right: 5px;
   
   opacity: 0.5;
   line-height: 24px;

}

.detailsBanner .content .right .info .text.bold {
   font-weight: 600;
   opacity: 1;
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

.icons {
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 margin-bottom: 30px;
 opacity: 0.7;
}
.heart{
   margin-bottom: 15px;
}
.bookmark{
   margin-right: 1px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}



.page-button.active {
color: #fff;
  background: #1c4b91;
}

.pagination {
    
    display: flex;
    justify-content: center;
    margin-top: 20px;
    z-index: 9999;
  }
  .jump-pagination{
    z-index: 1111;
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
    background: #1c4b91;
  }
  .jump-button:active {
    background: #1c4b91;
  }

  

.icon_select{
position: relative;
top: 2px;
  width: 40px;
  font-size: 21px;
  justify-items: center;
}
.circle_progress {
  position: absolute;
  bottom: 70px;
  left: 10px;
  color: #ffffff;
}

.circle_progress .percentage {
  color: black;
}

.ratingtext {
  position: relative;
  bottom: 110px;
  right: 37px;
  font-size: 21px;
  color: #020c1b;
  font-weight: bold;
  text-align: center;
}

.container {
  max-width: 960px;
  margin: 0 auto;

  padding: 20px;
  color: #fff;
}

.title_container{
    margin-top: 60px;
  display: flex;
 justify-content: space-between;
 flex-direction: column;
 
}
.title{
  position: relative;
}
.title::before {
  content: '';
  position: absolute;
  width: 75%;
  height: 2px;
  background: white;
  bottom: -3px;
 
}

.title_container h2{
  letter-spacing: 0.2em;
 font-family: cursive;
}

@media (min-width: 768px) {
    .title_container {
      flex-direction: row;
    }
  }
.sort-options{
  color: white;
  margin: 0 10px;
color: #1c4b91;
  align-self: center;
}

.custom-dropdown{
 width: 200px;

 color: #fff;
}
.p-dropdown .p-dropdown-label .p-placeholder {
    color: white;
}
.p-dropdown-label{
  color: white; 
}
.sort_select{
  position: relative;
  background:  #1c4b91;
  color: white;
}
.sort_select  {
  position: relative;
  color: white;
}

.sort_select::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 38px;
  transform: translateY(-50%);
  width: 2px;
  height: 18px;
  background-color: white;

}
.movie-item {
  padding: 20px;
}

.movie-poster {
  text-align: center;
  border-radius: 8px;
  margin-right: 30px;

}

.poster-image {
  max-width: 150px;
  border-radius: 11px;

 
}

.movie-details {
  padding-top: 10px;
  width: 100%;
  color: white;
  height: 80px;
}

.movie-name {
  font-size: 25px;
  margin-bottom: 5px;
  

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
  bottom: 90px
}
.list{
  display: flex;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;

  color: #fff;
}
.movie-list {
  list-style-type: none;
  padding: 0;
}

.movie-container {
  display: flex;
  margin-bottom: 20px;
}

.poster-container {
  margin-right: 10px;
}




.description {
  margin-bottom: 10px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.infoItem {
  margin-right: 10px;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.ratingtext {
  margin-left: 5px;
}


</style>




  