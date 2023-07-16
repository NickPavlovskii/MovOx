<template>
  <div class="container">
    <div class="movie-list">
      <div class="section">
        <h2 class="section-title">Посмотреть позже</h2>
        <ul class="movie-card-list">
          <li v-for="(movie) in paginatedBookmarkedMovies" :key="movie.id" class="movie-card-item">
            <MovieCard :movie="movie" />
          </li>
        </ul>
        <div class="pagination" v-if="bookmarkedMovies.length > 6">
          <button v-for="page in bookmarkedPages" :key="page" @click="currentPageBookmarked = page" :class="{ active: page === currentPageBookmarked }">{{ page }}</button>
        </div>
      </div>

      <div class="section">
        <h2>Оцененные фильмы</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in ratedMovies" :key="movie.id">
              <td>
                <img :src="movie.poster.url" :alt="movie.name" height="100">
                {{ movie.name }}
              </td>
              <td>
                <Rating v-model="movie.rating" :stars="10" cancel="false" :readonly="true" class="custom-rating" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MovieCard from './MovieCard.vue';
import Rating from 'primevue/rating';

export default {
  components: {
    MovieCard,
    Rating,
  },
  data() {
    return {
      currentPageBookmarked: 1,
      moviesPerPage: 6,
    };
  },
  computed: {
    ...mapState(['movies']),
    bookmarkedMovies() {
      return this.movies.filter((movie) => {
        const bookmarkKey = `bookmark_${movie.id}`;
        return localStorage.getItem(bookmarkKey) === 'true';
      });
    },
    ratedMovies() {
      return this.movies.filter((movie) => {
        const ratingKey = `rating_${movie.id}`;
        const rating = localStorage.getItem(ratingKey);
        return rating !== null;
      }).map((movie) => {
        return {
          ...movie,
          rating: parseInt(localStorage.getItem(`rating_${movie.id}`)),
        };
      });
    },
    bookmarkedPages() {
      return Math.ceil(this.bookmarkedMovies.length / this.moviesPerPage);
    },
    paginatedBookmarkedMovies() {
      const startIndex = (this.currentPageBookmarked - 1) * this.moviesPerPage;
      const endIndex = this.currentPageBookmarked * this.moviesPerPage;
      return this.bookmarkedMovies.slice(startIndex, endIndex);
    },
  },
  methods: {
    rateMovie(movieId, rating) {
      const movie = this.movies.find((movie) => movie.id === movieId);
      if (movie) {
        movie.rating = rating;
        localStorage.setItem(`rating_${movie.id}`, rating.toString());
        localStorage.setItem(`rating_date_${movie.id}`, new Date().toISOString());
        localStorage.setItem('movies', JSON.stringify(this.movies));
      }
    },
    removeRating(movieId) {
      const index = this.ratedMovies.findIndex((movie) => movie.id === movieId);
      if (index !== -1) {
        this.ratedMovies.splice(index, 1);
        localStorage.removeItem(`rating_${movieId}`);
        localStorage.setItem('movies', JSON.stringify(this.movies));
      }
    },
    getRatingDate(movieId) {
      const ratingDate = localStorage.getItem(`rating_date_${movieId}`);
      if (ratingDate) {
        return new Date(ratingDate).toLocaleDateString();
      }
      return '';
    },
  },
};
</script>



<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;

  color: #fff;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination-button:hover {
  background-color: #555;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.star {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
}

.star.active {
  background-color: yellow;
}

.delete-button {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
}

.delete-button:hover {
  color: darkred;
}
.movie-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.movie-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.poster {
  width: 60px;
  height: auto;
}

.section {
    
  margin-top: 140px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.movie-card-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.movie-card-item {
  width: 250px;
 
}

/* Пример стилей для компонента MovieCard */
.movie-card {
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-card img {
 
  object-fit: cover;
}

.movie-card-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
}
</style>

  
  
