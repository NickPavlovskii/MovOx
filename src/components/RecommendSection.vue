<template>
  <div class="container" v-if="recommendedMovies.length > 0">
    <h2 class="title">Рекомендуем к просмотру</h2>
    <div class="wrapper">
      <i id="left" @click="scrollLeft"
        ><font-awesome-icon icon="arrow-left"
      /></i>
      <div
        class="carousel"
        :class="{ dragging: isDragging }"
        @mousedown="dragStart"
        @touchstart="dragStart"
        @mousemove="dragging"
        @touchmove="dragging"
        @mouseup="dragStop"
        @touchend="dragStop"
      >
        <div
          class="movie-poster"
          v-for="movie in recommendedMovies"
          :key="movie.id"
        >
          <MovieCard :movie="movie" />
        </div>
      </div>
      <i id="right" @click="scrollRight">
        <font-awesome-icon icon="arrow-right" />
      </i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./MovieCard.vue";

library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faHeart);

export default {
  components: {
    FontAwesomeIcon,
    MovieCard,
  },
  computed: {
    ...mapState(["movie"]),
    recommendedMovies() {
      const bookmarkedMovies = this.movie.movies.filter((movie) => {
        const bookmarkKey = `bookmark_${movie.id}`;
        const hasBookmark = localStorage.getItem(bookmarkKey) === "true";

        const likeKey = `like_${movie.id}`;
        const hasLike = localStorage.getItem(likeKey) === "true";

        return hasBookmark || hasLike;
      });

      const genres = [
        ...new Set(bookmarkedMovies.flatMap((movie) => movie.genres)),
      ];
      const countries = [
        ...new Set(bookmarkedMovies.flatMap((movie) => movie.country)),
      ];
      const actors = [
        ...new Set(
          bookmarkedMovies.flatMap((movie) =>
            movie.cast && Array.isArray(movie.cast)
              ? movie.cast.map((actor) => actor.name)
              : []
          )
        ),
      ];

      const groupedMoviesByGenres = {};
      this.movie.movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          if (!groupedMoviesByGenres[genre]) {
            groupedMoviesByGenres[genre] = [];
          }
          groupedMoviesByGenres[genre].push(movie);
        });
      });

      const groupedMoviesByCountries = {};
      this.movie.movies.forEach((movie) => {
        const country = movie.country;
        if (!groupedMoviesByCountries[country]) {
          groupedMoviesByCountries[country] = [];
        }
        groupedMoviesByCountries[country].push(movie);
      });

      const groupedMoviesByActors = {};
      this.movie.movies.forEach((movie) => {
        if (movie.cast && Array.isArray(movie.cast)) {
          movie.cast.forEach((actor) => {
            if (!groupedMoviesByActors[actor.name]) {
              groupedMoviesByActors[actor.name] = [];
            }
            groupedMoviesByActors[actor.name].push(movie);
          });
        }
      });

      const popularGenres = genres.sort(
        (a, b) =>
          groupedMoviesByGenres[b].length - groupedMoviesByGenres[a].length
      );
      const popularCountries = countries.sort(
        (a, b) =>
          groupedMoviesByCountries[b].length -
          groupedMoviesByCountries[a].length
      );
      const popularActors = actors.sort(
        (a, b) =>
          groupedMoviesByActors[b].length - groupedMoviesByActors[a].length
      );

      const recommendedMovies = [];
      [popularGenres, popularCountries, popularActors].forEach((category) => {
        category.forEach((item) => {
          const movies =
            groupedMoviesByGenres[item] ||
            groupedMoviesByCountries[item] ||
            groupedMoviesByActors[item];
          if (movies) {
            recommendedMovies.push(...movies);
          }
        });
      });

      const randomMovies = recommendedMovies
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      return randomMovies;
    },
  },
  data() {
    return {
      isDragStart: false,
      isDragging: false,
      prevPageX: 0,
      prevScrollLeft: 0,
      positionDiff: 0,
    };
  },
  methods: {
    ...mapMutations(["setMovies"]),
    scrollLeft() {
      const carousel = this.$el.querySelector(".carousel");
      const firstImg = carousel.querySelectorAll("img")[0];
      const firstImgWidth = firstImg.clientWidth + 14;
      carousel.scrollLeft -= firstImgWidth;
      this.showHideIcons();
    },
    scrollRight() {
      const carousel = this.$el.querySelector(".carousel");
      const firstImg = carousel.querySelectorAll("img")[0];
      const firstImgWidth = firstImg.clientWidth + 14;
      carousel.scrollLeft += firstImgWidth;
      this.showHideIcons();
    },
    showHideIcons() {
      const carousel = this.$el.querySelector(".carousel");
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      const arrowIcons = this.$el.querySelectorAll(".wrapper i");
      arrowIcons[0].style.display =
        carousel.scrollLeft === 0 ? "none" : "block";
      arrowIcons[1].style.display =
        carousel.scrollLeft === scrollWidth ? "none" : "block";
    },
    autoSlide() {
      const carousel = this.$el.querySelector(".carousel");
      const firstImg = carousel.querySelectorAll("img")[0];
      const firstImgWidth = firstImg.clientWidth + 14;
      const valDifference = firstImgWidth - Math.abs(this.positionDiff);

      if (carousel.scrollLeft > this.prevScrollLeft) {
        carousel.scrollLeft +=
          this.positionDiff > firstImgWidth / 3
            ? valDifference
            : -this.positionDiff;
      } else {
        carousel.scrollLeft -=
          this.positionDiff > firstImgWidth / 3
            ? valDifference
            : -this.positionDiff;
      }
    },
    dragStart(e) {
      this.isDragStart = true;
      this.prevPageX = e.pageX || e.touches[0].pageX;
      this.prevScrollLeft = this.$el.querySelector(".carousel").scrollLeft;
    },
    dragging(e) {
      if (!this.isDragStart) return;
      e.preventDefault();
      this.isDragging = true;
      this.$el.querySelector(".carousel").classList.add("dragging");
      this.positionDiff = (e.pageX || e.touches[0].pageX) - this.prevPageX;
      this.$el.querySelector(".carousel").scrollLeft =
        this.prevScrollLeft - this.positionDiff;
      this.showHideIcons();
    },
    dragStop() {
      this.isDragStart = false;
      this.$el.querySelector(".carousel").classList.remove("dragging");
      if (!this.isDragging) return;
      this.isDragging = false;
      this.autoSlide();
    },
  },
};
</script>

<style scoped>
.title {
  font-family: cursive;
  letter-spacing: 0.1em;
}

#left {
  bottom: 290px;
  left: 1px;
  background-color: #020c1b99;
  color: #ffffff;
}

#right {
  right: 1px;
  background-color: #020c1b99;
  color: #ffffff;
}

.container {
  max-width: 960px;
  padding: 20px;
  color: #fff;
}

.wrapper {
  height: 100%;
  color: #fff;
  max-width: 960px;
  margin: 0 auto;
  display: flex;

  position: relative;
}

.wrapper i {
  height: 44px;
  width: 44px;
  color: #343f4f;
  cursor: pointer;
  font-size: 1.15rem;
  position: absolute;
  text-align: center;
  line-height: 44px;
  background: #fff;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: transform 0.1s linear;
}

.wrapper i:active {
  transform: translateY(-50%) scale(0.9);
}

.wrapper i:hover {
  background: #f2f2f2;
}

.wrapper i:first-child {
  left: -22px;
  display: none;
}

.wrapper .carousel {
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.carousel.dragging {
  cursor: grab;
  scroll-behavior: auto;
}

.carousel .movie-poster {
  border-radius: 8px;
  display: inline-block;
}

.carousel .movie-poster img {
  border-radius: 11px;
  width: 215px;
}

.carousel .movie-poster:first-child {
  margin-left: 0px;
}

@media screen and (max-width: 900px) {
  .carousel .movie-poster img {
    width: calc(100% / 2);
  }
}

@media screen and (max-width: 550px) {
  .carousel .movie-poster img {
    width: 100%;
  }
}
</style>
