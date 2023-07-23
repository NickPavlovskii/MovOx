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
      isLoading: false, // Add isLoading state property
    };
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










