<template>
  <div>
    <h2>Фильмы</h2>
    <input type="text" v-model="searchQuery" @input="searchMovies" placeholder="Поиск фильмов..." />
    <ul>
      <li v-for="movie in filteredMovies" :key="movie.externalId.kpHD">
        <!-- Отображение информации о фильме -->
        <h3>{{ movie.name }}</h3>
        <p>{{ movie.description }}</p>
        <!-- Отображение других свойств фильма -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapState(['movies', 'searchQuery']), // Сопоставление состояния 'movies' из хранилища Vuex
    filteredMovies() {
      return this.movies.filter(movie => {
        return  movie.type = 'movies' &&  movie.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions(['searchMovies', 'searchQuery']), // Сопоставление действия 'searchMovies' из хранилища Vuex
  },
  mounted() {
    // Диспетчеризуйте действие 'searchMovies' для заполнения начального списка фильмов
    this.searchMovies();
  },
};
</script>

  