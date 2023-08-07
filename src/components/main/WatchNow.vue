<template>
  <div class="container">
    <h2 class="title">
      <font-awesome-icon icon="fire" class="fire" />
      Новинки
    </h2>
    <div class="wrapper">
      <i id="left" @click="scrollLeft"><font-awesome-icon icon="arrow-left" /></i>
      <div 
      class="carousel" 
      @mousedown="dragStart" 
      @touchstart="dragStart" 
      @mousemove="dragging" 
      @touchmove="dragging"
      @mouseup="dragStop" 
      @touchend="dragStop" 
      :class="{ 'dragging': isDragging }">
        <div class="movie-poster" v-for="movie in latestMovies" :key="movie.id">
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
import { mapState, mapMutations } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faArrowRight, faArrowLeft, faFire, faHeart } from '@fortawesome/free-solid-svg-icons'
import MovieCard from '../MovieCard.vue';
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faHeart)
library.add(faFire)

export default {
  components: {
    FontAwesomeIcon,

    MovieCard
  },
  computed: {
    ...mapState(['movies']),
    latestMovies() {
      if (this.movies.length > 0) {
        const sortedMovies = [...this.movies]; // Создаем копию массива this.movies
        sortedMovies.sort((a, b) => b.year - a.year); // Сортировка фильмов по убыванию года
        return sortedMovies.slice(0, 10); // Возвращаем только первые 10 фильмов
      }
      return [];
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
    ...mapMutations(['setMovies']), // Добавлено использование мутации setMovies
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
      arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
      arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
    },
    autoSlide() {
      const carousel = this.$el.querySelector(".carousel");
      const firstImg = carousel.querySelectorAll("img")[0];
      const firstImgWidth = firstImg.clientWidth + 14;
      const valDifference = firstImgWidth - Math.abs(this.positionDiff);

      if (carousel.scrollLeft > this.prevScrollLeft) {
        carousel.scrollLeft += this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff;
      } else {
        carousel.scrollLeft -= this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff;
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
      this.$el.querySelector(".carousel").scrollLeft = this.prevScrollLeft - this.positionDiff;
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


<style  lang="scss" >

.title{
font-family: cursive;
letter-spacing: 0.1em;
}
.longArrow{
 width: 20px;
position: relative;
top: 4px;
margin-left: 3px;

}
.circle_progress{
 position: absolute;
margin-top: 12px;
 left: 5px;
 color: #ffffff;

}
.circle_progress .percentage{
 color: black;
}


#left{
  z-index: 3;
 bottom: 290px;
left: 5px;
 background-color: #020c1b99;
 color: #ffffff;
}
#right{
  z-index: 3;
 bottom: 290px;
 right: 5px;
 background-color: #020c1b99;
 color: #ffffff;
}

.container {
 max-width: 960px;
 margin: 0 auto;
 padding: 20px;
 color: #fff;

 /* Movie Poster */
 .movie-poster {
    position: relative;
    display: inline-block;

    img {
      border-radius: 11px;
      width: 215px;
    }

    .description-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    &:hover .description-overlay {
      opacity: 1;
    }

    .shortDescription {
      max-width: 100%;
      padding: 20px;
      word-wrap: break-word;
      white-space: normal;
    }

    p {
      word-wrap: break-word;
    }
  }


 .wrapper {
  height: 100%;
  color: #fff;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  position: relative;

  i {
    height: 44px;
    width: 44px;
    color: #343F4F;
    cursor: pointer;
    font-size: 1.15rem;
    position: absolute;
    text-align: center;
    line-height: 44px;
    background: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: transform 0.1s linear;

    &:active {
      transform: translateY(-50%) scale(0.9);
    }

    &:hover {
      background: #f2f2f2;
    }

    &:first-child {
      left: -22px;
      display: none;
    }
  }
  /* Carousel */
  .carousel {
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
  }
     
}
     

} 
 
 @media screen and (max-width: 550px) {
   .carousel .movie-poster img {
     width: 100%;
   }
   .carousel .movie-poster {
     margin-right: 10px; 
   }
 }
    </style>