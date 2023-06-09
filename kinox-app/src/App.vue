<template>
  <div id="app">
    <MyHeader @search="updateSearchQuery" />

    
    <MovieList
      :movies="filteredMovies"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="changePage"
    />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';
import MyHeader from './components/Header/MyHeader.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    MovieList,
    MyHeader
  },
  computed: {
    ...mapState(['filteredMovies']),
  },
  data() {
    return {
      currentPage: 1, // Замените значение текущей страницы на свои данные
      totalPages: 1, // Замените значение общего количества страниц на свои данные
    };
  },
  methods: {
    ...mapActions(['searchMovies']),
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
