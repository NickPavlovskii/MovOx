<template>
  <div class="ContentWrapper">
    <div class="heroBanner">
      <div class="backdrop-img">
        <div class="lazy-load-image-background">
          <img src="../fon.png" alt="">
        </div>
      </div>
      <div class="opacity-layer"></div>
      <div class="heroBannerContent">
        <h1 class="title">WELCOME</h1>
        <p class="subTitle">Миллион фильмов и сериалов только для тебя</p>
        <div class="searchInput">
          <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          placeholder="Поиск фильма"
          class="search-input"
        />
        <button @click="performSearch" class="search-button">Поиск</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isSearchActive: false,
      searchQuery: '',
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(['movies', 'searchQuery', 'filteredMovies']), // Добавить filteredMovies в computed
  },

  methods: {
    ...mapActions(['searchMovies']),
    performSearch() {
      this.searchMovies(); // Вызвать действие searchMovies для обновления filteredMovies в хранилище
      this.$emit('search', this.searchQuery); // Эмитировать событие 'search' с переданным значением поискового запроса
    },

 
  },
  mounted() {
    this.searchMovies();
  },
};
</script>






  <style>
.heroBanner {
   
    width: 100%;
    height: 450px;
 
  background-color: black;
  display: flex;
  align-items: center;

  position: relative;
  z-index: 1;
}

.heroBanner .backdrop-img {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  opacity: 0.5;
  overflow: hidden;
}

.heroBanner .backdrop-img .lazy-load-image-background {
  width: 100%;
  height: 100%;
}

.backdrop-img .lazy-load-image-background img {
  height: 135%;
  width: 100%;
  position: relative;

  object-fit: cover;
  object-position: center;
}

.heroBanner .opacity-layer {
  width: 100%;
  height: 250px;
  background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
  position: absolute;
  bottom: 0;
  left: 0;
}

.heroBanner .heroBannerContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.heroBanner .heroBannerContent .title {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 10px;
}

.heroBanner .heroBannerContent .subTitle {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 40px;
}

.heroBanner .heroBannerContent .searchInput {
  display: flex;
  align-items: center;
  width: 120%;
}

.heroBanner .heroBannerContent .searchInput input {
  width: calc(100% - 100px);
  height: 50px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 30px 0 0 30px;
  padding: 0 15px;
  font-size: 14px;
}

.heroBanner .heroBannerContent .searchInput button {
  width: 100px;
  height: 50px;
  background: linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%);  
  color: white;
  outline: 0;
  border: 0;
  border-radius: 0 30px 30px 0;
  font-size: 16px;
  cursor: pointer;
}

</style>