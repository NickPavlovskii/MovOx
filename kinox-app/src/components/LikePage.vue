<template>
  <div class="container">
    <div class="movie-list">
      <div class="section">
      
        <div class="title_container">
          <h2 class="title">Посмотреть позже</h2>
        </div>
        <ul class="movie-card-list">
          <li v-for="movie in paginatedBookmarkedMovies" :key="movie.id" class="movie-card-item">
            <MovieCard :movie="movie" />
          </li>
        </ul>
        <div class="pagination">
          <Paginator v-model:first="currentPageBookmarked" :rows="1" :totalRecords="bookmarkedPages" />
        </div>

      </div>
      <div style="" class="clapperboard_icons">
          <img src="../assets/clapperboard.png" alt="" style="height: 40px; opacity: 0.3; margin-right: 70px;">
          <img src="../assets/clapperboard.png" alt="" style="height: 80px; opacity: 0.75; margin-right: 70px;">
          <img src="../assets/clapperboard.png" alt="" style="height: 140px; opacity: 1; margin-right: 70px;">
          <img src="../assets/clapperboard.png" alt="" style="height: 80px; opacity: 0.75; margin-right: 70px;">
          <img src="../assets/clapperboard.png" alt="" style="height: 40px; opacity: 0.3; margin-right: 50px;">
        </div> 

      <div class="section">
        <div class="title_container">
          <h2 class="title">Оцененные фильмы</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in paginatedRatedMovies" :key="movie.id">
              <td style="display: flex; flex-direction: column;">
                <MovieCard :movie="movie" style="width: 250px;" />

              </td>
              <td>
                <Rating v-model="movie.like" :stars="10" :cancel="false" :readonly="true" class="custom-rating" />
              </td>
              <td>
                <img src="https://primefaces.org/cdn/primevue/images/rating/cancel.png" height="24" width="24"
                  @click="removeRating(movie.id)" />

              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <Paginator v-model:first="currentPageRated" :rows="1" :totalRecords="ratedPages" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MovieCard from './MovieCard.vue';
import Rating from 'primevue/rating';
import Paginator from 'primevue/paginator';
export default {
  components: {
    MovieCard,
    Rating,
    Paginator
  },
  data() {
    return {

      currentPageBookmarked: 0,
      currentPageRated: 0, // Текущая страница для оцененных фильмов
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
        const like = localStorage.getItem(ratingKey);
        return like !== null;
      }).map((movie) => {
        return {
          ...movie,
          like: parseInt(localStorage.getItem(`rating_${movie.id}`)),
        };
      });
    },
    displayedMovies() {
      const startIndex = (this.currentPageRated - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      return this.ratedMovies.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.ratedMovies.length / this.moviesPerPage);
    },

    bookmarkedPages() {
      return Math.ceil(this.bookmarkedMovies.length / this.moviesPerPage);
    },
    ratedPages() {
      return Math.ceil(this.ratedMovies.length / this.moviesPerPage);
    },
    paginatedBookmarkedMovies() {
      const startIndex = (this.currentPageBookmarked) * this.moviesPerPage;

      return this.bookmarkedMovies.slice(startIndex, startIndex + this.moviesPerPage);
    },


    paginatedRatedMovies() {
      const startIndex = (this.currentPageRated) * this.moviesPerPage;

      return this.ratedMovies.slice(startIndex, startIndex + this.moviesPerPage);

    }

  },
  methods: {
    handlePageChange(newPage) {
      this.currentPageRated = newPage;
    },
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
<style scoped >
/* Общие стили для таблицы и ячеек */


th,
td {
  padding: 10px;


}

.movie-poster {
  text-align: center;
  border-radius: 8px;
  margin-right: 30px;

}

.poster-image {
  max-width: 150px;
  border-radius: 11px;


}

.movie-details {
  padding-top: 10px;
  width: 100%;
  color: white;
  height: 80px;
}

.movie-name {
  font-size: 25px;
  margin-bottom: 5px;


  font-weight: bold;

}


.circle_progress {
  position: absolute;
  bottom: 70px;
  left: 10px;
  color: #ffffff;
}





/* Стили для кнопки удаления */
img[src="https://primefaces.org/cdn/primevue/images/rating/cancel.png"] {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

img[src="https://primefaces.org/cdn/primevue/images/rating/cancel.png"]:hover {
  transform: scale(1.2);
}

/* Стили для пагинации */
</style>



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
  z-index: 9999;
}

.jump-pagination {
  z-index: 3;
}

.page-button {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #f7f7f7;
}

.page-button:hover {
  background-color: #e1e1e1;
}

.page-button.active {
  color: #fff;
  background: #1c4b91;
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

.clapperboard_icons {
  display: flex;
  justify-content: center;
  align-items: center;
 
  margin-left: 50px;
}

@media screen and (max-width: 900px) {
  .clapperboard_icons img:nth-child(1),
  .clapperboard_icons img:nth-child(5) {
    display: none;
  }
      }
      @media screen and (max-width: 480px) {
        .clapperboard_icons img:nth-child(1),
  .clapperboard_icons img:nth-child(5) {
    display: block;
  }

        .clapperboard_icons img:nth-child(3),
      
  .clapperboard_icons img:nth-child(2){
    display: none;
  }
      }
.section {

  margin-top: 140px;
}

.title_container {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

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

  
  
