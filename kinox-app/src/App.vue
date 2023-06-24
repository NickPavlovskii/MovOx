<template>
  <div id="app">
    <MyHeader @search="updateSearchQuery" />
    
    <router-view>
</router-view>
<!-- <MoviePage/> -->
      <Footer/>
   
  </div>
</template>

<script>
// import MovieList from './components/MovieList.vue';
import  MyHeader from './components/Header/MyHeader.vue';
import  Footer from './components/Footer/MyFooter.vue';
// import MoviePage from './components/MoviePage/MoviePage.vue';
import { mapState, mapActions } from 'vuex';
// 
export default {
  name: 'App',
  components: {
    // MovieList,
    MyHeader,
    Footer,
    // MoviePage
   
  },
  computed: {
    ...mapState(['movies','filteredMovies']),
  },
  data() {
    return {
      currentPage: 1, // Замените значение текущей страницы на свои данные
      totalPages: 1, // Замените значение общего количества страниц на свои данные
    };
  },
  methods: {
    ...mapActions(['fetchMovies', 'selectMovie', 'searchMovies']),
    changePage(page) {
      // Обработка изменения страницы
      this.currentPage = page;
      // Загрузка данных для новой страницы
    },
    updateSearchQuery(query) {
      this.$store.commit('setSearchQuery', query); // Использовать мутацию setSearchQuery из хранилища Vuex
      this.currentPage = 1;
      this.searchMovies(); // Вызвать действие searchMovies из хранилища Vuex
    },
  },
};
</script>


<style>
#app {
  background: #04152d; 

}
</style>
