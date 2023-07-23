
<template>
  <div class="container">

    <div class="detailsBanner">

      <div class="backdrop-img">
        <div class="lazy-load-image-background">
          <img :src="movie.poster.url" alt="Movie Poster" class="posterImg">
        </div>
      </div>
      <div class="opacity-layer"></div>

      <div class="content">

        <div class="left">
          <img :src="movie.poster.url" alt="Movie Poster" class="posterImg">

          <div style="display: flex;   flex-direction: column; ">

            <div style="display: flex; flex-direction: column;">
              <h3 style="margin: 25px -2px -2px -2px">Поставьте оценку</h3>
              <span class="text">Это улучшит ваши рекомендации</span>
            </div>
            <div style="display: flex;">
              <img src="https://primefaces.org/cdn/primevue/images/rating/cancel.png" height="24" width="24"
                @click="resetRating" style="position: relative; top: 8px;" />
              <Rating v-model="rating" :stars="10" @input="saveRating" class="custom-rating" :cancel=false />
            </div>

            <div style="display: flex; justify-content: flex-end;">

              <button :class="{ active: isBookmarked }" @click.stop="toggleBookmark($event)" class="myButton  btn-3">
                <span>
                  <Icon v-if="!isBookmarked" icon="ic:outline-bookmark-add" class="icn" />
                  <Icon v-else icon="material-symbols:bookmark-add" class="icn" />
                  Смотреть позже
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="right">
          <h1 class="title">{{ movie.name }} </h1>




          <h4 class="subtitle">{{ movie.alternativeName }}</h4>
          <div class="genres">
            <div v-for="genre in movie.genres" :key="genre">
              <span class="genre">{{ genre }}</span>

            </div>
          </div>
          <div class="overview">
            <h2 class="heading">О фильме</h2>
            <p class="description">{{ movie.description }}</p>
          </div>


          <div class="right-rows">
            <div class="row">
              <div class="info">
                <div class="infoItem">
                  <span class="text bold" style="letter-spacing: 0.2em;">Режиссер</span>

                  <span class="text">{{ movie.director.producer.join(', ') }}</span>
                </div>
                <div class="infoItem">
                  <span class="text bold">Cценарист:</span>
                  <span class="text">{{ movie.director.screenwriter.join(', ') }}</span>
                </div>
              </div>

            </div>
            <div class="row" style="position: relative; bottom: 30px;">
              <div class="info">
                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="globe" /></span>
                  <span class="text">{{ movie.country }}</span>
                </div>
                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="clock" /></span>
                  <span class="text">{{ convertMinutesToHours(movie.movieLength) }}</span>
                </div>
                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="calendar-days" /></span>
                  <span class="text">{{ movie.year }}</span>
                </div>
              </div>

            </div>

            <div class="row raiting">
              <div class="info">

                <div class="infoItem">
                  <span class="text bold"><font-awesome-icon icon="fa-brands fa-imdb" size="2xl"
                      style="background: #1c4b91;" /></span>
                  <span class="text" style="display: flex; align-items: center;">{{ movie.rating.imdb }}</span>
                </div>
                <div class="infoItem" style="display: flex; align-items: center;">
                  <span class="text bold">kp:</span>
                  <span class="text">{{ movie.rating.kp }}</span>
                </div>
              </div>


            </div>


            <div style=" position: relative; bottom: 70px;">
              <h3 style=" margin-bottom: -0px;   letter-spacing: 0.2em;">Рейтинг Кинокритиков</h3>
              <div class="progress-bars">
                <div style="display: flex;     flex-direction: column; width: 315px;">
                  <h4 style="    letter-spacing: 0.2em;"> В Мире</h4>
                  <div class="progress-bar">

                    <ProgressBar :value="movie.rating.filmCritics * 10">{{ movie.rating.filmCritics }}</ProgressBar>
                  </div>
                  <span class="text votes">{{ movie.votes.filmCritics }} голосов</span>

                </div>
                <div style="display: flex;     flex-direction: column; width: 270px; ">
                  <h4>В России</h4>
                  <div class="progress-bar rf">

                    <ProgressBar :value="movie.rating.russianFilmCritics"> <span
                        style="margin-bottom: 2px;">{{ movie.rating.russianFilmCritics }}</span> </ProgressBar>

                  </div>
                  <span class="text votes">{{ movie.votes.russianFilmCritics }} голосов</span>
                </div>
              </div>

            </div>
            <div class="watchability" v-if="movie.watchability.items != null">
              <p class="watchability-heading">Доступно на:</p>
              <ul class="watchability-list">
                <li v-for="item in movie.watchability.items" :key="item._id">
                  <a :href="item.url" target="_blank">
                    <img :src="item.logo.url" :alt="item.name" class="watchability-logo">
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      <h4 class="link"> <router-link to="/" style="text-decoration: none;cursor: pointer; color: white;">
          <span style="text-decoration: underline; cursor: pointer;">KinOx</span>
        </router-link>/{{ movie.name }}</h4>
    </div>
    <div style="position: relative; bottom: 100px;">
      <div class="Cast" v-if="movie.type !== 'cartoon'">
        <h3 class="watchability-heading">Каст:</h3>
        <ul class=" cast-list">
          <li v-for="item in movie.cast" :key="item._id">
            <div class="cast-log" :style="'background-image: url(' + item.photo.url + ');'"></div>
            <div style="display: flex; flex-direction: column;">
              <span>{{ item.name }}</span>
              <span class="text">{{ item.role }}</span>
            </div>
          </li>
        </ul>
      </div>
      <MyRecom class="MyRecom" />
    </div>
  </div>
</template>


<script>
import MyRecom from '../../components/MyRecom.vue';

import { Icon } from '@iconify/vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faCalendarDays, faGlobe, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import Rating from 'primevue/rating';
import ProgressBar from 'primevue/progressbar';

library.add(faClock, faCalendarDays, faGlobe, faBookmark, faImdb);

export default {
  components: {
    FontAwesomeIcon,
    MyRecom,
    Rating,
    ProgressBar,
    Icon,
  },
  data() {
    return {
      rating: null,
      isBookmarked: false,
      hasRating: false,
      ratedMovies: [], // ?
    };
  },
  watch: {
    // Следим за изменениями свойства 'isBookmarked', чтобы обновить LocalStorage
    isBookmarked(value) {
      localStorage.setItem(this.bookmarkKey, value.toString());
    },
    // Следим за изменениями свойства 'rating', чтобы обновить LocalStorage
    rating(value) {
      localStorage.setItem(this.ratingKey, value.toString());
    },
  },
  created() {
    // Загружаем оцененные фильмы из LocalStorage при создании компонента
    const ratedMovies = localStorage.getItem('ratedMovies');
    if (ratedMovies) {
      this.ratedMovies = JSON.parse(ratedMovies);
    }
    const bookmarkKey = `bookmark_${this.movie.id}`;
    const ratingKey = `rating_${this.movie.id}`;

    // Проверяем сохраненные значения в локальном хранилище
    if (localStorage.getItem(bookmarkKey) === 'true') {
      this.isBookmarked = true;
    }

    if (localStorage.getItem(ratingKey)) {
      this.rating = parseInt(localStorage.getItem(ratingKey));
    }
  },
  computed: {
    ...mapState(['movies']),
   
    movie() {
      // Получаем информацию о фильме на основе переданного id из маршрута
      const movieId = parseInt(this.$route.params.id);
      return this.movies.find((movie) => movie.id === movieId);
    },
     // Создаем ключ для закладки на основе id фильма для хранения в LocalStorage
    bookmarkKey() {
      return `bookmark_${this.movie.id}`;
    },
    // Создаем ключ для рейтинга на основе id фильма для хранения в LocalStorage
    ratingKey() {
      return `rating_${this.movie.id}`;
    },
  },
  mounted() {
    if (!this.movies.length) {
      this.fetchMovies();
    }
    if (localStorage.getItem('rating')) {
      this.savedRating = parseInt(localStorage.getItem('rating'));
    }
  },
  methods: {
    ...mapActions(['fetchMovies']),
    // Сохраняем рейтинг в LocalStorage, когда пользователь оценивает фильм
    saveRating(rating) {
      this.rating = rating;
      const movieId = this.movie.id;
      const localStorageKey = `rating_${movieId}`;
      const ratingDateKey = `rating_date_${movieId}`;
      const ratingDate = new Date().toISOString();

      localStorage.setItem(localStorageKey, rating.toString());
      localStorage.setItem(ratingDateKey, ratingDate);
    },
    // Сбрасываем значение рейтинга на null
    resetRating() {
      this.rating = null;
    },
    convertMinutesToHours(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}ч ${remainingMinutes}м`;
    },
    // Изменяем состояние закладки и обновляем LocalStorage соответственно
    toggleBookmark(event) {
      this.isBookmarked = !this.isBookmarked;
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.Cast {
  position: relative;
  bottom: 20px;
}

.genres {
  display: flex;
  gap: 5px;
  margin-bottom: 6px;
}

.genre {
  background-color: #da2f68;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;

  height: 80%;

}

.left {
  flex-shrink: 0;
  width: 40%;

}


.MyRecom {
  position: relative;

}

.custom-rating {
  height: 24px;
  margin-top: 7px;
  margin-bottom: 5px;
}

.myButton {
  color: white;
  width: 190px;
  background: linear-gradient(0deg, #1c4b91 0%, #027efb 100%);
  padding: 0.6rem 0.6rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: 1000;
  font-style: normal;
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  outline: none;
}

.btn-3 {
  background: linear-gradient(0deg, rgba(28, 75, 145, 1) 0%, rgba(2, 126, 251, 1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;
}

.btn-3 span {
  position: relative;
  display: block;
  border: none;
  border-radius: 5.2rem;
  width: 100%;
  height: 100%;
}

.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3:before {
  height: 0%;
  width: 2px;
}

.btn-3:after {
  width: 0%;
  height: 2px;
}

.btn-3:hover {
  background: transparent;
  box-shadow: none;
}

.btn-3:hover:before {
  height: 100%;
}

.btn-3:hover:after {
  width: 100%;
}

.btn-3 span:hover {
  color: rgba(2, 126, 251, 1);
}

.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3 span:before {
  width: 2px;
  height: 0%;
}

.btn-3 span:after {
  width: 0%;
  height: 2px;
}

.btn-3 span:hover:before {
  height: 100%;
}

.btn-3 span:hover:after {
  width: 100%;
}

.icn {
  font-size: 24px;
  margin-right: 5px;
  position: relative;
  top: 7px;

}

.progress-bars {
  display: flex;
  gap: 70px;


}

.progress-bar {
  margin-right: 20px;
  width: 100%;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 20px;
  overflow: hidden;
}


.right-rows {
  position: relative;
  bottom: 40px;
}

.raiting {
  position: relative;
  bottom: 60px;
}

.link {
  position: absolute;
  top: 60px;
  left: 50px;
}

.watchability {

  position: relative;


  bottom: 70px;
}

.watchability-heading {
  font-size: 20px;
  color: white;
  margin-bottom: 25px;
  font-family: cursive;
  letter-spacing: 0.1em;
}

.watchability-list {
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  list-style-type: none;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.watchability-list::-webkit-scrollbar {
  width: 0;
  /* Установите ширину полосы прокрутки на 0 */
}

.cast-list {
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  list-style-type: none;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.cast-list::-webkit-scrollbar {
  width: 2px;

  height: 8px;
}



.cast-list::-webkit-scrollbar-thumb {
  background-color: #1c4b91;
  border-radius: 3px;
}

.watchability-list li {
  text-align: center;
  color: white;
  list-style-type: none;
}

.cast-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
}

.cast-log {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}


.cast-logo img {
  width: 80%;
  height: 80%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.watchability-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
}

.watchability-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.detailsBanner {
  width: 100%;

  padding-top: 100px;
  margin-bottom: 50px;
}

@media (max-width: 768px) {
  .detailsBanner {
    margin-bottom: 0;
    padding-top: 120px;
    min-height: 700px;
  }
}

.detailsBanner .backdrop-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.1;
  overflow: hidden;
}

.detailsBanner .backdrop-img .lazy-load-image-background {
  width: 100%;
  height: 100%;
}

.detailsBanner .backdrop-img .lazy-load-image-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.detailsBanner .opacity-layer {
  width: 100%;
  height: 250px;
  background: linear-gradient(180deg,
      rgba(4, 21, 45, 0) 0%,
      #04152d 79.17%);
  position: absolute;
  bottom: 0;
  left: 0;
}

.content {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;



}

@media (min-width: 768px) {
  .content {
    gap: 50px;
    flex-direction: row;
  }

}

.left .row {
  margin-top: 20px;
}

.detailsBanner .content .left .posterImg {
  width: 100%;
  display: block;
  border-radius: 12px;
}

@media (min-width: 768px) {
  .detailsBanner .content .left .posterImg {
    max-width: 350px;

  }
}

.right {
  color: white;
  width: 50%;
}

@media (max-width: 768px) {

  .left,
  .right {
    width: 100%;
    max-width: none;
  }

}

.detailsBanner .content .right .title {
  font-size: 28px;


}

@media (min-width: 768px) {
  .detailsBanner .content .right .title {
    font-size: 34px;
    line-height: 44px;
  }
}

.detailsBanner .content .right .subtitle {
  font-size: 16px;
  position: relative;
  bottom: 20px;
  font-style: italic;
  opacity: 0.5;
  margin-bottom: -5px;
}

@media (min-width: 768px) {
  .detailsBanner .content .right .subtitle {
    font-size: 20px;
    line-height: 28px;
  }
}


.detailsBanner .content .right .overview {
  margin-bottom: 25px;
  width: 100%;
  position: relative;
  bottom: 10px;
}

.detailsBanner .content .right .overview .heading {
  font-size: 24px;
  margin-bottom: 10px;
}

.detailsBanner .content .right .overview .description {
  line-height: 24px;
}

@media (max-width: 768px) {
  .detailsBanner .content .right .overview .description {
    padding-right: 100px;
  }
}


.votes {
  margin-top: -7px;
}

.detailsBanner .content .right .playbtn .text {

  font-size: 20px;
  transition: all 0.7s ease-in-out;


}


.detailsBanner .content .row {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 20px;
  position: relative;

}

.detailsBanner .content .info {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;
  display: flex;
}

.detailsBanner .content .info .infoItem {
  margin-right: 10px;
  display: flex;
  flex-flow: row wrap;
}

.text {
  margin-right: 10px;
  opacity: 0.5;
  line-height: 24px;
}

.text.bold {
  font-weight: 600;
  opacity: 1;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

</style>



  
