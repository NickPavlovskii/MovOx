<template>
  <ContentWrapper
    v-if="this.$route.path === '/search'"
    class="ContentWrapper"
  />
  <div class="container movieList">
    <div v-if="this.$route.path === '/'">
      <h2 class="container_title">Наша коллекция</h2>
      <div class="sort-options">
        <Dropdown
          :class="[
            'custom-dropdown',
            'w-full',
            'md:w-14rem',
            'p-dropdown-indigo',
          ]"
          v-model="selectedSortOption"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          @change="sortMovies"
          placeholder="Сортировать по"
          class="custom-dropdown w-full md:w-14rem"
        ></Dropdown>
        <font-awesome-icon
          icon="arrow-up-9-1"
          v-if="sortOrder === 'asc'"
          @click="updateSortOrder('desc')"
          class="icon_select"
        />
        <font-awesome-icon
          icon="arrow-up-1-9"
          v-else
          @click="updateSortOrder('asc')"
          class="icon_select"
        />
      </div>
      <ul class="movie-list">
        <li
          v-for="movie in moviess"
          :key="movie.id"
          :class="{ 'movie-item': true }"
        >
          <MovieCard :movie="movie" />
        </li>
      </ul>
    </div>
    <div v-else-if="this.$route.path === '/search'">
      <h2 class="container_title">Вы искали</h2>
      <div class="sort-options">
        <Dropdown
          :class="[
            'custom-dropdown',
            'w-full',
            'md:w-14rem',
            'p-dropdown-indigo',
          ]"
          v-model="selectedSortOption"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          @change="sortMovies"
          placeholder="Сортировать по"
          class="custom-dropdown w-full md:w-14rem"
        ></Dropdown>
        <font-awesome-icon
          icon="arrow-up-9-1"
          v-if="sortOrder === 'asc'"
          @click="updateSortOrder('desc')"
          class="icon_select"
        />
        <font-awesome-icon
          icon="arrow-up-1-9"
          v-else
          @click="updateSortOrder('asc')"
          class="icon_select"
        />
      </div>

      <ul class="movie-list">
        <li
          v-for="movie in displayedMovies"
          :key="movie.id"
          :class="{ 'movie-item': true }"
        >
          <MovieCard :movie="movie" />
        </li>
      </ul>
    </div>
    <div class="pagination">
      <Paginator
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          default:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        }"
        v-model:first="currentPage"
        :rows="1"
        :totalRecords="totalPages"
      />
    </div>
  </div>
</template>

<script>
import Paginator from "primevue/paginator";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp91, faArrowUp19 } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./MovieCard.vue";
import Dropdown from "primevue/dropdown";
import ContentWrapper from "./main/ContentWrapper.vue";
library.add(faArrowUp91);
library.add(faArrowUp19);

export default {
  components: {
    FontAwesomeIcon,
    ContentWrapper,
    MovieCard,
    Dropdown,
    Paginator,
  },
  data() {
    return {
      currentPage: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["movie", "sorting"]),
    ...mapGetters(["getMovieById", "sortedMovies"]),

    sortOrder() {
      return this.sorting.sortOrder;
    },

    sortOptions() {
      return this.sorting.sortOptions;
    },

    selectedSortOption: {
      get() {
        return this.sorting.selectedSortOption;
      },
      set(option) {
        this.updateSelectedSortOption(option);
      },
    },

    totalPages() {
      return Math.ceil(this.totalMovies / this.movie.itemsPerPage);
    },

    moviess() {
      const sortedMovies = this.sortedMovies; // Call the getter function

      // Calculate the starting index of the current page
      const startIndex = this.currentPage * this.movie.itemsPerPage;

      // Return a subset of the sorted movies as per pagination
      return sortedMovies.slice(
        startIndex,
        startIndex + this.movie.itemsPerPage
      );
    },
    displayedMovies() {
      const sortedMovies = this.sortedMovies;
      // Фильтрация фильмов
      const filteredMovies = sortedMovies.filter((movie) => {
        // Ваш код фильтрации, например, по searchQuery
        return movie.name
          .toLowerCase()
          .includes(this.movie.searchQuery.toLowerCase());
      });
      // Calculate the starting index of the current page
      const startIndex = this.currentPage * this.movie.itemsPerPage;

      // Return a subset of the sorted movies as per pagination
      return filteredMovies.slice(
        startIndex,
        startIndex + this.movie.itemsPerPage
      );
    },
    totalMovies() {
      const moviesList =
        this.$route.path === "/"
          ? this.$store.state.movie.movies
          : this.$store.state.movie.filteredMovies;
      return moviesList.length;
    },
    shouldShowLoadMoreButton() {
      return this.currentPage * this.movie.itemsPerPage < this.totalMovies;
    },
  },
  mounted() {
    this.fetchMovies();
    this.searchMovies();
  },
  methods: {
    ...mapMutations(["updateSelectedSortOption", "SET_SORT_ORDER"]),
    ...mapActions(["fetchMovies", "searchMovies", "updateSortOrder"]),

    updateSortOrder(order) {
      this.SET_SORT_ORDER(order);
      this.currentPage = 0;
    },
    setSortOrder(order) {
      this.$store.commit("sorting/SET_SORT_ORDER", order); // Устанавливаем сортировку через мутацию
    },
    onPageChange(pageNumber) {
      this.currentPage = pageNumber;
    },
    handleEnter() {
      if (event.key === "Enter") {
        this.updateMovieList();
      }
    },
    navigateToLikePage() {
      this.$router.push({ name: "bookmarks-ratings" });
    },

    getPropertyValue(obj, propertyPath) {
      const pathArray = propertyPath.split(".");
      return pathArray.reduce((currentObj, key) => {
        return currentObj ? currentObj[key] : undefined;
      }, obj);
    },

    setCurrentPage(event) {
      this.currentPage = event.page + 1;
    },
    loadMore() {
      this.currentPage++;
    },
    performSearch(query) {
      this.setSearchQuery(query);
      this.currentPage = 1;
      this.setCurrentPage(1);
    },

    async searchMovies() {
      this.isLoading = true;
      await this.$store.dispatch("movie/searchMovies");
      this.isLoading = false;
    },
    async fetchMovieData() {
      const movieId = this.$route.params.id;
      this.movie = this.$store.getters["getMovieById"](movieId); // Используем геттер getMovieById из модуля movie
      if (!this.movie) {
        await this.$store.dispatch("movie/fetchMovie", movieId); // Используем действие fetchMovie из модуля movie
        this.movie = this.$store.getters["movie/getMovieById"](movieId); // Обновляем this.movie после загрузки
      }
    },
  },
  created() {
    this.fetchMovieData();
  },
};
</script>

<style scoped>
.custom-dropdown {
  width: 200px;
  color: #fff;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
}
.container_title {
  display: flex;
  justify-content: center;
  letter-spacing: 0.1em;
  font-family: cursive;
}
.sort-options {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.icon_select {
  position: relative;
  top: 2px;
  width: 40px;
  font-size: 21px;
  justify-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 9999;
}

.ContentWrapper {
  text-align: center;
  margin: 0 auto;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: -30px;
}

.movie-item {
  z-index: 2;
  padding: 10px;
}
</style>
