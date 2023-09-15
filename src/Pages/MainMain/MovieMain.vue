<template>
  <div>
    <ContentWrapper @search="performSearch" class="ContentWrapper" />
    <SocialLinksPanel />
    <!-- Блок с индикатором загрузки, отображается во время загрузки данных -->
    <div v-if="isLoading" class="loader">
      <BaseLoader />
    </div>
    <!-- Блок контента, отображаемый после окончания загрузки -->
    <div v-else>
      <div>
        <!-- Компонент WatchNow для предложения "Смотреть сейчас" -->
        <WatchNow />
        <!-- Компонент TopMovie для отображения лучшего фильма -->
        <TopMovie />
        <!-- Компонент ClapperboardIcon для отображения иконки киноплёнки -->
        <ClapperboardIcon />
      </div>
      <!-- Компонент MovieList для отображения списка фильмов -->
      <MovieList />
    </div>
  </div>
</template>

<script>
import BaseLoader from "../../components/BaseLoader.vue";
import SocialLinksPanel from "../../components/SocialLinksPanel.vue";
import MovieList from "../../components/MovieList.vue";
import ContentWrapper from "../../components/main/ContentWrapper.vue";
import TopMovie from "../../components/main/TopMovie.vue";
import WatchNow from "../../components/main/WatchNow.vue";
import ClapperboardIcon from "../../components/ClapperboardIcon.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    SocialLinksPanel,
    BaseLoader,
    ContentWrapper,
    MovieList,
    TopMovie,
    WatchNow,
    ClapperboardIcon,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async beforeMount() {
    // Имитация загрузки данных (задержка в 2 секунды)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.isLoading = false; // Закончили имитацию загрузки, скрываем лоадер
  },
  computed: {
    ...mapState(["movie"]),
  },
  methods: {
    ...mapActions(["movie", "fetchMovies", "searchMovies"]),

    async searchMoviesWithLoader() {
      this.isLoading = true;

      // Задержка выполнения на 2 секунды (2000 миллисекунд)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.$store.dispatch("movie/searchMovies"); // Выполняем поиск

      this.isLoading = false; // Отключаем лоадер
    },
    mounted() {
      // Имитация задержки загрузки на 2 секунды (можно заменить на реальную логику загрузки)
      setTimeout(() => {
        this.isLoading = false; // Выключаем лоадер после загрузки
      }, 2000);
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: #333;
}

.ContentWrapper {
  text-align: center;
  margin: 0 auto;
}
</style>
