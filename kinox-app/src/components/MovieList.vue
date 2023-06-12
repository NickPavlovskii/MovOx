<template>
  <div>
    <ContentWrapper @search="performSearch" class="ContentWrapper" />

    <div v-if="!searchQuery">
      <WatchNow />
      <TopMovie />
      <MyRecom/>
      
    </div>

    <div class="container" v-if="searchQuery">
      <h2>Наща коллекция</h2>
      <p>  Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках чего-нибудь интересного?
      Тогда вам стоит задержаться у нас</p>
    
      <ul class="movie-list">
        <li v-for="(movie, index) in displayedMovies" :key="movie.externalId.kpHD" :class="{'movie-item': true, 'new-row': index % 5 === 0}" style="  cursor: pointer;text-decoration: none; list-style-type: none;">

              <router-link to="/" style="  cursor: pointer;text-decoration: none; list-style-type: none;"> 
          <div class="movie-poster">
           
                <img :src="movie.poster.url" alt="Постер фильма" class="poster-image" />

            <font-awesome-icon icon="heart" class="heart"/>
          </div>
      
          <div class="movie-details">
            <circle-progress class="circle_progress"
            :viewport="true"
        
            :on-viewport= "movie.rating.kp.toFixed(1)"
                :size="60"
                :background="'white'"
      :is-gradient="true"
      :percent=movie.rating.kp*10
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
  >

        
  </circle-progress>
  <span  class="ratingtext">
        {{ movie.rating.kp.toFixed(1) }}
      </span>  

            <h3 class="movie-name">{{ movie.name }} </h3>
             <!-- ({{ movie.type}}) -->
       
             
              <div class="year">{{ movie.year }}</div>
          
          </div>
        </router-link>
         
        </li>
      </ul>

      <button @click="loadMore" v-if="shouldShowLoadMoreButton" class="load-more-button">Загрузить еще</button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import ContentWrapper from './main/ContentWrapper.vue';
import  TopMovie from './main/TopMovie.vue';
import   WatchNow from './main/WatchNow.vue';
import   MyRecom from './main/MyRecom.vue';

import { mapState, mapActions } from 'vuex';
import CircleProgress from "vue3-circle-progress";
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
library.add(faBookmark)
library.add(faHeart)
export default {
  components: {
    ContentWrapper,
    CircleProgress,
    FontAwesomeIcon,
    TopMovie,
    WatchNow,
    MyRecom
  },
  data() {
    return {
      itemsPerPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(['filteredMovies', 'searchQuery']), // Добавить filteredMovies и searchQuery из хранилища Vuex
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMovies.slice(startIndex, startIndex + this.itemsPerPage);
    },
    shouldShowLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredMovies.length;
    },
  },
  mounted() {
    this.searchMovies();
  },
  methods: {
    ...mapActions(['searchMovies']),
    loadMore() {
      this.currentPage++;
    },
    performSearch(query) {
      this.$store.commit('setSearchQuery', query); // Использовать мутацию setSearchQuery из хранилища Vuex
      this.currentPage = 1;
    },
    // getColor(rating) {
    //   if (rating < 5) {
    //     return ['#ff0000']; // red
    //   } else if (rating < 8) {
    //     return ['#ffa500']; // orange
    //   } else {
    //     return ['#008000']; // green
    //   }
    // },
  },
};
</script>


<style scoped>

.circle_progress{
  position: absolute;
  bottom: 70px;
  left: 10px;
  color: #ffffff;

}
.circle_progress .percentage{
  color: black;
}

.ratingtext {
  position: relative;
bottom: 112px;
margin-left: 26px;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.movie-item {

  padding: 10px;

}

.movie-poster {
  text-align: center;
  border-radius: 8px;
}
.heart{
  position: relative;
  bottom: 280px;
  left: 80px;
 color: #020c1b;
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






