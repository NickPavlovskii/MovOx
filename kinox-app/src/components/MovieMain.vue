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
import MySocial from './MySocial.vue';
import MovieList from './MovieList.vue';
import ContentWrapper from './main/ContentWrapper.vue';
import TopMovie from './main/TopMovie.vue';
import WatchNow from './main/WatchNow.vue';
import MyLoader from './MyLoader.vue';
import ClapperboardIcon from './ClapperboardIcon.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp91, faArrowUp19 } from '@fortawesome/free-solid-svg-icons';


library.add(faArrowUp91);
library.add(faArrowUp19);

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

      itemsPerPage: 21,
      currentPage: 1,
      sortOptions: [
        { value: 'Сортировать по', label: 'Сортировать по' },
        { value: 'year', label: 'Год' },
        { value: 'rating.kp', label: 'Рейтинг' },
        { value: 'movieLength', label: 'Длительность' }
      ],
      selectedSortOption: 'Сортировать по',
      sortOrder: 'asc',
      isLoading: false, // Add isLoading state property

    };
  },
  computed: {
    ...mapState(['filteredMovies', 'searchQuery', 'movies']),
    ...mapGetters(['getMovieById']),
    movies() {
      return this.$store.state.movies;
    },
    totalMovies() {
      return this.movies.length;
    },


    shouldShowLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredMovies.length;
    },
  },
  mounted() {
    this.searchMovies();
    this.$store.dispatch('movies/fetchMovieList');
  },
  methods: {
    handleEnter() {
      // Здесь вы можете выполнить действие при нажатии на клавишу Enter
      if (event.key === 'Enter') {

        this.updateMovieList();
      }
    },
    // Обработчик нажатия на фильм
    navigateToLikePage() {
      this.$router.push({ name: 'bookmarks-ratings' });
    },

    ...mapActions(['fetchMovies', 'searchMovies']),
    updateSortOrder(order) {
      this.sortOrder = order;
      this.sortMovies();
    },

    sortMovies() {
      // Sort the movies array based on the selectedSortOption and sortOrder
      this.filteredMovies.sort((a, b) => {
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
      this.isLoading = true; // Set isLoading to true before starting the request
      await this.$store.dispatch('searchMovies');
      this.isLoading = false; // Set isLoading to false after the request is completed
    },
    async fetchMovieData() {
      const movieId = this.$route.params.id;
      // Используйте ваш метод getMovieById для получения данных о фильме
      this.movie = this.getMovieById(movieId);
      // Если фильма нет в хранилище, выполните загрузку данных
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









