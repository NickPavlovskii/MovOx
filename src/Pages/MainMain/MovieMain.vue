<template>
  <div>
    <ContentWrapper @search="performSearch" class="ContentWrapper" />
    <SocialLinksPanel/>
     <!-- Блок с индикатором загрузки, отображается во время загрузки данных -->
     <div v-if="isLoading" class="loader">
      <BaseLoader/>
    </div>
    <!-- Блок контента, отображаемый после окончания загрузки -->
    <div v-else>
      <div>
        <!-- Компонент WatchNow для предложения "Смотреть сейчас" -->
        <WatchNow />
        <!-- Компонент TopMovie для отображения лучшего фильма -->
        <TopMovie />
        <!-- Компонент ClapperboardIcon для отображения иконки киноплёнки -->
        <ClapperboardIcon />
      </div>
      <!-- Компонент MovieList для отображения списка фильмов -->
      <MovieList />
    </div>
  </div>
</template>

<script>
import BaseLoader from '../../components/BaseLoader.vue';
import SocialLinksPanel from '../../components/SocialLinksPanel.vue';
import MovieList from '../../components/MovieList.vue';
import ContentWrapper from '../../components/main/ContentWrapper.vue';
import TopMovie from '../../components/main/TopMovie.vue';
import WatchNow from '../../components/main/WatchNow.vue';
import ClapperboardIcon from '../../components/ClapperboardIcon.vue';
import {mapActions} from 'vuex';


export default {
  components: {
    SocialLinksPanel,
    BaseLoader,
    ContentWrapper,
    MovieList,
    TopMovie,
    WatchNow,
    ClapperboardIcon
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
   
    ...mapActions(['fetchMovies', 'searchMovies']),
    


    async searchMovies() {
      this.isLoading = true; 
      await this.$store.dispatch('searchMovies');
      this.isLoading = false; 
    },
   
  },
 

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










