<template>
  <div class="container">
    <div>
      <div class="title_container">
      <h2 class="title"> <font-awesome-icon icon="trophy" style=" color: #f89e00;" /> Top 10 </h2> 
      <div class="switchingTabs">
    <div class="tabItems">
      <span @click="toggleTimeFrame('recent')" class="tabItem" :class="{ 'active': timeFrame === 'recent' }">За год</span>
      <span @click="toggleTimeFrame('all')" class="tabItem" :class="{ 'active': timeFrame === 'all' }">За все время</span>
      <div class="movingBg" :style="{ left: activeTabLeft }"></div>
    </div>
  </div>
    </div>
    </div>  
    <div class="wrapper">
      <i id="left" @click="scrollLeft"><font-awesome-icon icon="arrow-left" /></i>
      <div class="carousel" @mousedown="dragStart" @touchstart="dragStart" @mousemove="dragging" @touchmove="dragging"
        @mouseup="dragStop" @touchend="dragStop" :class="{'dragging': isDragging}">
        <div class="movie-poster" v-for="movie in latestMovies" :key="movie.id">
          
            <MovieCard :movie="movie" />
          
        </div>
      </div>
      <i id="right" @click="scrollRight"><font-awesome-icon icon="arrow-right" /></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faArrowRight, faArrowLeft, faTrophy, faHeart } from '@fortawesome/free-solid-svg-icons'
import MovieCard from '../MovieCard.vue';
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faHeart)
library.add(faTrophy)

export default {
  components: {
    FontAwesomeIcon,
 
    MovieCard
  },

  computed: {
    ...mapState(['movies']),
   
    latestMovies() {
      if (this.movies.length > 0) {
        const sortedMovies = [...this.movies];
        sortedMovies.sort((a, b) => b.rating.kp - a.rating.kp); // Сортировка фильмов по убыванию рейтинга
        
        if (this.timeFrame === 'recent') {
          // Отображение фильмов за последний год
          const uniqueYears = [...new Set(sortedMovies.map(movie => movie.year))];
          const topYears = uniqueYears.sort((a, b) => b - a).slice(0, 3);
          return sortedMovies.filter(movie => topYears.includes(movie.year));
        } else {
          // Отображение фильмов за все время
          return sortedMovies.slice(0, 10);
        }
      }
      return [];
    },
    activeTabLeft() {
  if (this.timeFrame === 'recent') {
    return '0';
  } else if (this.timeFrame === 'all') {
    return '100px';
  }
  return null;
},

  },
  data() {
    return {
      isDragStart: false,
      isDragging: false,
      prevPageX: 0,
      prevScrollLeft: 0,
      positionDiff: 0,
     
      timeFrame: 'recent',
    };
  },
  methods: {
    ...mapMutations(['setMovies']),
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
    toggleTimeFrame(timeFrame) {
      this.timeFrame = timeFrame;
    },
  },
};
</script>

<style lang="scss" scoped>
 .movie-poster {
    position: relative;
    display: inline-block;
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

  .movie-poster:hover .description-overlay {
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

.switchingTabs {
  position: relative;
  height: 34px;
  top: 15px;
  background-color: white;
  border-radius: 20px;
  padding: 2px 0px 2px 0px;
  
  .tabItems {
    display: flex;
    align-items: center;
    height: 30px;
    position: relative;
    
    .tabItem {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      color: #020c1b;
      font-size: 14px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: color ease 0.3s;
      
      &.active {
        color: white;
      }
    }
    
    .movingBg {
      height: 35px;
      width: 100px;
      border-radius: 20px;
      background-image: linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%);
      position: absolute;
      right: 2px;
      top: -2px;
      transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
    }
  }
}

.title {
  
}

.longArrow {
  width: 20px;
  position: relative;
  top: 4px;
  margin-left: 3px;
}

.circle_progress {
  position: absolute;
  margin-top: 12px;
  left: 5px;
  color: #ffffff;
  
  .percentage {
    color: black;
  }
}

.ratingtext {
  position: relative;
  bottom: 111px;
  margin-left: 26px;
  font-size: 21px;
  color: #020c1b;
  font-weight: bold;
  text-align: center;
}

#left {
  bottom: 290px;
  left: 5px;
  background-color: #020c1b99;
  color: #ffffff;
}

#right {
  bottom: 290px;
  right: 5px;
  background-color: #020c1b99;
  color: #ffffff;
}

.movie-details {
  padding-top: 10px;
  width: 100%;
  color: white;
  height: 80px;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  height: 480px;
  color: #fff;
  
  .title_container {
    display: flex;
    justify-content: space-between;
  }
  
  .circle_progress {
    position: absolute;
    bottom: 70px;
    left: 10px;
    color: #ffffff;
  }
  
  .movie-name {
    font-size: 19px;
    margin-bottom: 5px;
    position: relative;
    bottom: 98px;
    display: block;
    width: 250px;
    font-weight: bold;
    word-break: break-all;
    
  }
  
  .year {
    font-size: 16px;
    color: #888;
    position: relative;
    bottom: 95px;
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
  
  .carousel {
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
    
    &.dragging {
      cursor: grab;
      scroll-behavior: auto;
    }
  }
  
  .movie-poster {
    border-radius: 8px;
    display: inline-block;
    
    img {
      border-radius: 11px;
      width: 215px;
    }
    
    &:first-child {
      margin-left: 0px;
    }
  }
  
  @media screen and (max-width: 900px) {
    .movie-poster img {
      width: calc(100% / 2);
    }
  }
  
  @media screen and (max-width: 550px) {
    .movie-poster img {
      width: 100%;
    }
  }
}
</style>

  
  

  