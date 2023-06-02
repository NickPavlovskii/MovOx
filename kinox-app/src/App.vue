<template>
  <div id="app">
    <MyHeader/>
    <!-- <KinoHeader/> -->
    <MovieList :movies="movies" :currentPage="currentPage" :totalPages="totalPages" @pageChange="changePage" />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';
// import   KinoHeader from './components/KinoHeader.vue';

import  MyHeader from './components/Header/MyHeader.vue';


export default {
  name: 'App',
  components: {
    MovieList,
    // KinoHeader,
    MyHeader
  },
  data() {
    return {
      movies: [], // Замените пустой массив фильмов на свои данные
      currentPage: 1, // Замените значение текущей страницы на свои данные
      totalPages: 1, // Замените значение общего количества страниц на свои данные
    };
  },
  methods: {
    changePage(page) {
      // Обработка изменения страницы
      this.currentPage = page;
      // Загрузка данных для новой страницы
      this.loadMovies();
    },
    loadMovies() {
  // Выполняем запрос к API для получения данных фильмов
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      this.movies = data; // Обновляем массив фильмов
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных фильмов:', error);
    });
}

  },
  mounted() {
    // Загрузка данных фильмов при монтировании компонента
    this.loadMovies();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
