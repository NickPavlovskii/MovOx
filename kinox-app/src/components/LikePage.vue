<template>
    <div>
      <h2>Liked Movies</h2>
      <ul>
        <li v-for="movie in likedMovies" :key="movie.id">
          <router-link :to="{ name: 'movie-details', params: { id: movie.id }}">
           
            <MovieCard :movie="movie"/>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import MovieCard from './MovieCard.vue';
  export default {
    components: {
        MovieCard


    },
    computed: {
      ...mapState(['movies']),
      likedMovies() {
        return this.movies.filter((movie) => {
          const likeKey = `rating_${movie.id}`;
          return localStorage.getItem(likeKey) === 'true';
        });
      },
    },
  };
  </script>
  