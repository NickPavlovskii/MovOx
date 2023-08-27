<template>
  <div class="container">
    <div class="movie-list">
      <!-- Section for bookmarked movies -->
      <div class="section Bookmark" v-if="this.bookmarkedMovies.length > 0">
        <div class="title_container">
          <h2 class="title">
            <font-awesome-icon icon="fa-solid fa-film" />Посмотреть позже
          </h2>
        </div>
        <ul class="movie-card-list">
          <li
            v-for="movie in paginatedBookmarkedMovies"
            :key="movie.id"
            class="movie-card-item"
          >
            <MovieCard :movie="movie" />
          </li>
        </ul>
        <div class="pagination">
          <Paginator
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              default:
                'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            }"
            v-model:first="currentPageBookmarked"
            :rows="1"
            :totalRecords="bookmarkedPages"
          />
        </div>
      </div>
      <ClapperboardIcon
        v-if="this.ratedMovies.length > 0 && this.bookmarkedMovies.length > 0"
        style="margin-top: 40px; margin-bottom: -80px"
      />
      <!-- Section for rated movies -->
      <div class="section like" v-if="this.ratedMovies.length > 0">
        <div class="title_container">
          <h2 class="title">
            <font-awesome-icon icon="fa-solid fa-star" /> Оцененные фильмы
          </h2>
        </div>
        <table class="table" style="margin: auto">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in paginatedRatedMovies" :key="movie.id">
              <td>
                <MovieCard :movie="movie" style="width: 250px" />
              </td>
              <td class="Rating">

                <div style="display: flex; margin-top: -30px;">
                  <Rating 
                    v-model="movie.like" 
                    :stars="10" 
                    :cancel="false" 
                    :readonly="true" 
                    class="custom-rating" 
                  />
                  <img 
                    src="https://primefaces.org/cdn/primevue/images/rating/cancel.png" 
                    height="24" 
                    width="24"
                    @click="removeRating(movie.id)" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <Paginator
            v-model:first="currentPageRated"
            :rows="1"
            :totalRecords="ratedPages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MovieCard from "../../components/MovieCard.vue";
import Rating from "primevue/rating";
import Paginator from "primevue/paginator";
import ClapperboardIcon from "../../components/ClapperboardIcon.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faFilm, faStar);
export default {
  components: {
    MovieCard,
    Rating,
    Paginator,
    FontAwesomeIcon,
    ClapperboardIcon,
  },
  data() {
    return {
      // Current page for bookmarked movies pagination
      currentPageBookmarked: 0,
      // Current page for rated movies pagination
      currentPageRated: 0,
      // Number of movies displayed per page
      moviesPerPage: 6,
    };
  },
  computed: {
    ...mapState(["movies"]),

    ...mapGetters(["isMovieBookmarked", "getRatedMovies"]),
    // Filter movies that are bookmarked by checking local storage
    bookmarkedMovies() {
      return this.movies.filter((movie) => {
        const bookmarkKey = `bookmark_${movie.id}`;
        return localStorage.getItem(bookmarkKey) === "true";
      });
    },
    // Filter movies that are rated by checking local storage and map them with their ratings
    ratedMovies() {
      return this.movies
        .filter((movie) => {
          const ratingKey = `rating_${movie.id}`;
          const like = localStorage.getItem(ratingKey);
          return like !== null;
        })
        .map((movie) => {
          return {
            ...movie,
            like: parseInt(localStorage.getItem(`rating_${movie.id}`)),
          };
        });
    },
    // Calculate the movies displayed on the current rated movies pagination page
    displayedMovies() {
      const startIndex = (this.currentPageRated - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      return this.ratedMovies.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages for rated movies pagination
    totalPages() {
      return Math.ceil(this.ratedMovies.length / this.moviesPerPage);
    },
    // Calculate the total number of pages for bookmarked movies pagination
    bookmarkedPages() {
      return Math.ceil(this.bookmarkedMovies.length / this.moviesPerPage);
    },
    ratedPages() {
      return Math.ceil(this.ratedMovies.length / this.moviesPerPage);
    },
    paginatedBookmarkedMovies() {
      const startIndex = this.currentPageBookmarked * this.moviesPerPage;

      return this.bookmarkedMovies.slice(
        startIndex,
        startIndex + this.moviesPerPage
      );
    },

    paginatedRatedMovies() {
      const startIndex = this.currentPageRated * this.moviesPerPage;

      return this.ratedMovies.slice(
        startIndex,
        startIndex + this.moviesPerPage
      );
    },
  },
  methods: {
    ...mapActions(["toggleRating", "rateMovie", "removeRating", "fetchMovies"]),
    // Handle the page change event for rated movies pagination
    handlePageChange(newPage) {
      this.currentPageRated = newPage;
    },
    // Rate a movie and save the rating in local storage
    rateMovie(movieId, rating) {
      const movie = this.movies.find((movie) => movie.id === movieId);
      if (movie) {
        movie.rating = rating;
        localStorage.setItem(`rating_${movie.id}`, rating.toString());
        localStorage.setItem("movies", JSON.stringify(this.movies));
      }
    },
    // Remove the rating of a movie from the rated movies list
    removeRating(movieId) {
      const index = this.ratedMovies.findIndex((movie) => movie.id === movieId);
      if (index !== -1) {
        this.ratedMovies.splice(index, 1);
        localStorage.removeItem(`rating_${movieId}`);
        localStorage.setItem("movies", JSON.stringify(this.movies));
      }
    },
  },
};
</script>

<style scoped>
.title {
  position: relative;
  right: 23px;
}

.like th,
td {
  padding: 10px;
}

@media (max-width: 768px) {
  .like td {
    display: flex;
    flex-direction: column;
  }
}

/* Стили для кнопки удаления */
img[src="https://primefaces.org/cdn/primevue/images/rating/cancel.png"]
{
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  margin-top: 8px;
  margin-left: 10px;
}

img[src="https://primefaces.org/cdn/primevue/images/rating/cancel.png"]:hover
{
  transform: scale(1.2);
}

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

.section {
  margin-top: 140px;
}

.title_container {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.movie-card-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card-item {
  width: 250px;
}
</style>
