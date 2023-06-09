<template>
  <div>
    <ContentWrapper @search="performSearch" class="ContentWrapper" />
    <div class="container">
      <ul class="movie-list">
        <li v-for="(movie, index) in displayedMovies" :key="movie.externalId.kpHD" :class="{'movie-item': true, 'new-row': index % 5 === 0}">
          <div class="movie-poster">
            <img :src="movie.poster.url" alt="Постер фильма" class="poster-image" />
          </div>
          <div class="movie-details">
            <h2 class="movie-name">{{ movie.name }}</h2>
            <div class="movie-info">
              <div class="rating-circle">
                <div class="circle" :style="{ backgroundColor: getColor(movie.rating.kp) }">
                  {{ movie.rating.kp }}
                </div>
              </div>
              <div class="year">{{ movie.year }}</div>
            </div>
          </div>
        </li>
      </ul>

      <button @click="loadMore" v-if="shouldShowLoadMoreButton" class="load-more-button">Загрузить еще</button>
    </div>
  </div>
</template>

<script>
import ContentWrapper from './ContentWrapper.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    ContentWrapper,
  },
  data() {
    return {
      itemsPerPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(['filteredMovies', 'searchQuery']), // Добавить filteredMovies и searchQuery из хранилища Vuex
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMovies.slice(startIndex, startIndex + this.itemsPerPage);
    },
    shouldShowLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredMovies.length;
    },
  },
  mounted() {
    this.searchMovies();
  },
  methods: {
    ...mapActions(['searchMovies']),
    loadMore() {
      this.currentPage++;
    },
    performSearch(query) {
      this.$store.commit('setSearchQuery', query); // Использовать мутацию setSearchQuery из хранилища Vuex
      this.currentPage = 1;
    },
    getColor(rating) {
      if (rating < 5) {
        return "#ff0000"; // red
      } else if (rating < 8) {
        return "#ffa500"; // orange
      } else {
        return "#008000"; // green
      }
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

.ContentWrapper {
  text-align: center;
  margin: 0 auto;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.movie-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.movie-poster {
  text-align: center;
}

.poster-image {
  max-width: 100%;
  height: auto;
}

.movie-details {
  padding-top: 10px;
}

.movie-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.movie-info {
  display: flex;
  align-items: center;
}

.rating-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5a623;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.year {
  font-size: 16px;
  color: #888;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
</style>


<!-- <script>
import moviesData from './kinopoisk.json';

export default {
  data() {
    return {
      movies: [],
      searchQuery: '',
      itemsPerPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    filteredMovies() {
      const query = this.searchQuery.toLowerCase();
      return this.movies.filter(movie => {
        return movie.name.toLowerCase().includes(query);
      });
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMovies.slice(startIndex, startIndex + this.itemsPerPage);
    },
    shouldShowLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredMovies.length;
    },
  },
  mounted() {
    this.movies = moviesData.docs;
  },
  methods: {
    loadMore() {
      this.currentPage++;
    },
    getColor(rating) {
      if (rating < 5) {
        return "#ff0000"; // red
      } else if (rating < 7) {
        return "#ffa500"; // orange
      } else {
        return "#008000"; // green
      }
    },
  },
};
</script> -->



