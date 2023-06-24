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
          <div class="pagination" v-if="bookmarkedMovies.length >6">
            <button v-for="page in bookmarkedPages" :key="page" @click="currentPageBookmarked = page" :class="{ active: page === currentPageBookmarked }">{{ page }}</button>
          </div>
        </div>
  
        <div class="section">
          <h2 class="section-title">История оценок</h2>
          <table class="movie-table">
            <tbody>
              <tr v-for="(movie) in paginatedLikedMovies" :key="movie.id">
                <td>
                  <img :src="movie.poster.url" alt="Movie Poster" class="poster" />
                </td>
                <td>{{ movie.name }}</td>
                <td class="movie-rating">
                  <span v-for="star in 10" :key="star" class="star" :class="{ active: movie.rating >= star }" @click="rateMovie(movie.id, star)"></span>
                </td>
                <td>
                  <button class="delete-button" @click="removeRating(movie.id)">&#10060;</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button v-for="page in likedPages" :key="page" @click="currentPageLiked = page" :class="{ active: page === currentPageLiked }">{{ page }}</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import MovieCard from './MovieCard.vue';
  
  export default {
    components: {
      MovieCard
    },
    data() {
      return {
        currentPageBookmarked: 1,
        currentPageLiked: 1,
        perPage: 6
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
      likedMovies() {
        return this.movies.filter((movie) => {
          const likeKey = `rating_${movie.id}`;
          return localStorage.getItem(likeKey) === 'true';
        });
      },
      bookmarkedPages() {
        return Math.ceil(this.bookmarkedMovies.length / this.perPage);
      },
      likedPages() {
        return Math.ceil(this.likedMovies.length / this.perPage);
      },
      paginatedBookmarkedMovies() {
        const startIndex = (this.currentPageBookmarked - 1) * this.perPage;
        const endIndex = this.currentPageBookmarked * this.perPage;
        return this.bookmarkedMovies.slice(startIndex, endIndex);
      },
      paginatedLikedMovies() {
        const startIndex = (this.currentPageLiked - 1) * this.perPage;
        const endIndex = this.currentPageLiked * this.perPage;
        return this.likedMovies.slice(startIndex, endIndex);
      }
    },
    methods: {
      
    }
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

  
  
