<template>
  <div>
    <ContentWrapper @search="performSearch" class="ContentWrapper" />
    <MySocial />
    <div v-if="isLoading" class="loader">
      <MyLoader />
    </div>
    <div v-else>
      <div>
        <WatchNow />
        <TopMovie />
        <ClapperboardIcon />
      </div>
      <MovieList />
    </div>
  </div>
</template>

<script>
import MySocial from '../../components/MySocial.vue';
import MovieList from '../../components/MovieList.vue';
import ContentWrapper from '../../components/main/ContentWrapper.vue';
import TopMovie from '../../components/main/TopMovie.vue';
import WatchNow from '../../components/main/WatchNow.vue';
import MyLoader from '../../components/MyLoader.vue';
import ClapperboardIcon from '../../components/ClapperboardIcon.vue';
import {  mapActions} from 'vuex';



export default {
  components: {
    ContentWrapper,
    MovieList,
    TopMovie,
    WatchNow,
    MyLoader,
    MySocial,
    ClapperboardIcon
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
   
    ...mapActions(['fetchMovies', 'searchMovies']),
    

   // эмитация загрузки данных 
    async searchMovies() {
      this.isLoading = true; // Set isLoading to true before starting the request
      await this.$store.dispatch('searchMovies');
      this.isLoading = false; // Set isLoading to false after the request is completed
    },
   
  },
    mounted() {
      this.searchMovies();
      this.$store.dispatch('movies/fetchMovieList');
    }

  };
</script>


<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: #333;
}


.ContentWrapper {
  text-align: center;
  margin: 0 auto;
}
</style>










