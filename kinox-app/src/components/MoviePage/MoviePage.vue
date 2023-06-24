


<template>
  <div class="container">
   
 <div class="detailsBanner">
  
    <div class="backdrop-img">
      <div class="lazy-load-image-background">
        <img :src="movie.poster.url" alt="Movie Poster" class="posterImg">
      </div>
    </div>
    <div class="opacity-layer"></div>
    <!-- <h4 class="link"> <router-link to="/" style="text-decoration: none;cursor: pointer; color: white;">
      
      <span style="text-decoration: underline; cursor: pointer;">KinOx</span>
    </router-link>/{{ movie.name }}</h4> -->
    <div class="content">
      
      <div class="left">
        <img :src="movie.poster.url" alt="Movie Poster" class="posterImg">
        
      </div>
      <div class="right">
        <h1 class="title">{{ movie.name }} </h1>
   

    
        
        <h4 class="subtitle">{{movie.alternativeName}}</h4>
       <!--  <div class="genres">
          <span class="genre">Comedy</span>
          <span class="genre">Drama</span> 
        </div>-->
        <div class="overview">
          <h2 class="heading">Описание</h2>
          <p class="description">{{ movie.description }}</p>
        </div>
     
        <!-- <div class="playbtn">
          <svg> Иконка проигрывания 
          </svg>
          <span class="text">Play Trailer</span>
        </div> -->
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
        <div class="row">
          <div class="info">
            <div class="infoItem">
              <span class="text bold">kp:</span>
              <span class="text">{{movie.rating.kp}}</span>
            </div>
            <div class="infoItem">
              <span class="text bold">imdb:</span>
              <span class="text">{{ movie.rating.imdb }}</span>
            </div>
            <div class="infoItem">
              <span class="text bold">Критики:</span>
              <span class="text">{{ movie.rating.filmCritics }}</span>
            </div>
          </div>
          
        
        </div>
    
        <div class="watchability" v-if="movie.watchability.items>0">
          <p class="watchability-heading">Доступно на:</p>
          <ul class="watchability-list">
            <li v-for="item in movie.watchability.items" :key="item._id">
              <a :href="item.url" target="_blank">
                <img :src="item.logo.url" :alt="item.name" class="watchability-logo">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h4 class="link"> <router-link to="/" style="text-decoration: none;cursor: pointer; color: white;">
      
      <span style="text-decoration: underline; cursor: pointer;">KinOx</span>
    </router-link>/{{ movie.name }}</h4>
    <MyRecom/>
  </div>

</div>
</template>


<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import MyRecom from '../MyRecom.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
library.add(faClock, faCalendarDays)
export default {
  components: {
    FontAwesomeIcon,
   MyRecom
  },
  computed: {
    ...mapState(['movies']),
    movie() {
      // Получаем информацию о фильме на основе переданного id из маршрута
      const movieId = parseInt(this.$route.params.id);
      return this.movies.find((movie) => movie.id === movieId);
    },
  },
  mounted() {
   
    if (!this.movies.length) {
      this.fetchMovies();
    }
  },
  methods: {
    ...mapActions(['fetchMovies']),
    convertMinutesToHours(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    },
  },
};
</script>


<style scoped>
.link{
 position: absolute;
 top: 60px;
 left: 50px;
}
.watchability {
  position: relative;
  margin-bottom: 50px;
  position: relative;
    bottom: 20px;
}

.watchability-heading {
  font-size: 20px;
  color: white;
  margin-bottom: 25px;
}

.watchability-list {
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  list-style-type: none;
}

.watchability-list li {
  text-align: center;
  color: white;
  list-style-type: none;
}

.watchability-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
}

.watchability-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.detailsBanner {
    width: 100%;

    padding-top: 100px;
    margin-bottom: 50px;
}

@media (min-width: 768px) {
    .detailsBanner {
        margin-bottom: 0;
        padding-top: 120px;
        min-height: 700px;
    }
}

.detailsBanner .backdrop-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
    overflow: hidden;
}

.detailsBanner .backdrop-img .lazy-load-image-background {
    width: 100%;
    height: 100%;
}

.detailsBanner .backdrop-img .lazy-load-image-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.detailsBanner .opacity-layer {
    width: 100%;
    height: 250px;
    background: linear-gradient(
        180deg,
        rgba(4, 21, 45, 0) 0%,
        #04152d 79.17%
    );
    position: absolute;
    bottom: 0;
    left: 0;
}

.detailsBanner .content {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    margin-top: 50px;
}

@media (min-width: 768px) {
    .detailsBanner .content {
        gap: 50px;
        flex-direction: row;
    }
}

.detailsBanner .content .left {
    flex-shrink: 0;
}

.detailsBanner .content .left .posterImg {
    width: 100%;
    display: block;
    border-radius: 12px;
}

@media (min-width: 768px) {
    .detailsBanner .content .left .posterImg {
        max-width: 350px;
     
    }
}

.detailsBanner .content .right {
    color: white;
}

.detailsBanner .content .right .title {
    font-size: 28px;


}

@media (min-width: 768px) {
    .detailsBanner .content .right .title {
        font-size: 34px;
        line-height: 44px;
    }
}

.detailsBanner .content .right .subtitle {
    font-size: 16px;
position: relative;
bottom: 20px;
    font-style: italic;
    opacity: 0.5;
}

@media (min-width: 768px) {
    .detailsBanner .content .right .subtitle {
        font-size: 20px;
        line-height: 28px;
    }
}

.detailsBanner .content .right .genres {
    margin-bottom: 25px;
    flex-flow: row wrap;
}

.detailsBanner .content .right .overview {
    margin-bottom: 25px;
    width: 122%;
    position: relative;
    bottom: 20px;
}

.detailsBanner .content .right .overview .heading {
    font-size: 24px;
    margin-bottom: 10px;
}

.detailsBanner .content .right .overview .description {
    line-height: 24px;
}

@media (min-width: 768px) {
    .detailsBanner .content .right .overview .description {
        padding-right: 100px;
    }
}

.detailsBanner .content .right .circleRating {
    max-width: 70px;
    background-color: var(--black2);
}

@media (min-width: 768px) {
    .detailsBanner .content .right .circleRating {
        max-width: 90px;
    }
}

.detailsBanner .content .right .circleRating .CircularProgressbar-text {
    fill: white;
}

.detailsBanner .content .right .playbtn {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
}

.detailsBanner .content .right .playbtn svg {
    width: 60px;
}

@media (min-width: 768px) {
    .detailsBanner .content .right .playbtn svg {
        width: 80px;
    }
}

.detailsBanner .content .right .playbtn .text {
    font-size: 20px;
    transition: all 0.7s ease-in-out;
}

.detailsBanner .content .right .playbtn .triangle {
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
    transition: all 0.7s ease-in-out;
}

.detailsBanner .content .right .playbtn .circle {
    stroke: white;
    stroke-dasharray: 650;
    stroke-dashoffset: 1300;
    transition: all 0.5s ease-in-out;
}

.detailsBanner .content .right .playbtn:hover .text {
    color: var(--pink);
}

.detailsBanner .content .right .playbtn:hover .triangle {
    stroke-dashoffset: 0;
    opacity: 1;
    stroke: var(--pink);
    animation: trailorPlay 0.7s ease-in-out;
}

.detailsBanner .content .right .playbtn:hover .circle {
    stroke-dashoffset: 0;
    stroke: var(--pink);
}

.detailsBanner .content .right .row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 20px;
    position: relative;
    bottom: 25px;
}

.detailsBanner .content .right .info {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 15px 0;
    display: flex;
}

.detailsBanner .content .right .info .infoItem {
    margin-right: 10px;
    display: flex;
    flex-flow: row wrap;
}

.detailsBanner .content .right .info .text {
    margin-right: 10px;
    opacity: 0.5;
    line-height: 24px;
}

.detailsBanner .content .right .info .text.bold {
    font-weight: 600;
    opacity: 1;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.poster-image {
  width: 200px;
  height: 100%;
  margin-bottom: 20px;
}
</style>








<style scoped>

.container{
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;

 

  color: white;
}
.movie-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
    display: flex;

}

.movie-card img {
  max-width: 100%;
}

.movie-card h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.movie-card p {
  margin-bottom: 10px;
}

.movie-card ul {
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

.movie-card ul li {
  margin-bottom: 5px;
}

.movie-card ul li a {
  text-decoration: none;
}
</style>

  
  