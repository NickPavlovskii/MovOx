<template>
    <div>
      <h2>Cartoon</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.externalId.kpHD">
          <!-- Display information about the movie -->
          <h3>{{ movie.name }}</h3>
          <p>{{ movie.description }}</p>
          <!-- Display other movie properties -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import moviesData from '../kinopoisk.json';
  
  export default {
    data() {
      return {
        movies: [], // Empty array for movies
      };
    },
    mounted() {
      // Assign the movie data to the 'movies' array
      this.movies = moviesData.docs.filter(movie => movie.type === 'cartoon');
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  