<template>
    <div class="container">
    
        <h1 class="title">Рекомендуем тебе<font-awesome-icon icon="arrow-right-long" class="longArrow" /></h1>
        <div class="wrapper">
           
          <i id="left"  @click="scrollLeft"><font-awesome-icon icon="arrow-left" /></i>
          <div class="carousel" @mousedown="dragStart" @touchstart="dragStart" @mousemove="dragging" @touchmove="dragging"
            @mouseup="dragStop" @touchend="dragStop" :class="{'dragging': isDragging}">
            
            <div class="movie-poster" v-for="movie in randomMovies" :key="movie.id">
                <router-link to="/" style="  cursor: pointer;text-decoration: none; list-style-type: none;">
                    <div class="movie-poster">
              <img :src="movie.poster.url" alt="Постер фильма" class="poster-image" />
              <!-- <font-awesome-icon icon="heart" class="heart" /> -->
            </div>
          

            <div class="movie-details">
                <circle-progress class="circle_progress"
                :viewport="true"
            
                :on-viewport= "movie.rating.kp.toFixed(1)"
                    :size="60"
                    :background="'white'"
          :is-gradient="true"
          :percent=movie.rating.kp*10
          :gradient="{
            angle: 90,
            startColor: '#ff0000',
            stopColor: '#ffff00'
        }"
        :is-bg-shadow="true"
          :bg-shadow="{
            inset: true,
            vertical: 2,
            horizontal: 2,
            blur: 4,
            opacity: .4,
            color: '#000000'
        }"
        :border-width="5"
          :border-bg-width="5"
      >
    
            
      </circle-progress>
      <span  class="ratingtext">
            {{ movie.rating.kp.toFixed(1) }}
          </span>  
    
                <h2 class="movie-name">{{ movie.name }} </h2>
                 <!-- ({{ movie.type}}) -->
                <div class="movie-info">
                  <div class="circleRating">
                   
         </div>
                  <div class="year">{{ movie.year }}</div>
                </div>
              </div>
            </router-link>
            </div>
      
          </div>
          <i id="right"  @click="scrollRight"><font-awesome-icon icon="arrow-right" /></i>
        </div>
    </div>
      </template>
    
      <script>
      import { mapState, mapMutations  } from 'vuex';
      import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
      import { library } from '@fortawesome/fontawesome-svg-core'
      import CircleProgress from "vue3-circle-progress";
      import { faArrowRight,faArrowLeft, faArrowRightLong, faHeart } from '@fortawesome/free-solid-svg-icons'
      library.add(faArrowRight)
      library.add(faArrowLeft)
      library.add(faHeart)
      library.add(faArrowRightLong)
   
      export default {
        components: {
            FontAwesomeIcon,
        CircleProgress,
        
      },
        computed: {
            ...mapState(['movies']),
            randomMovies() {
      // Получение 10 случайных фильмов из общего списка
      const randomIndexes = [];
      const randomMovies = [];

      while (randomIndexes.length < 10) {
        const randomIndex = Math.floor(Math.random() * this.movies.length);

        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
          randomMovies.push(this.movies[randomIndex]);
        }
      }

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

<style scoped>
.title{
  
}
.longArrow{
  width: 20px;
position: relative;
top: 4px;
margin-left: 6px;

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

.ratingtext {
  position: relative;
bottom: 111px;
margin-left: 26px;
  font-size: 21px;
color: #020c1b;
  font-weight: bold;
  text-align: center;
}
#left{
  bottom: 290px;
left: 1px;
  background-color: #020c1b99;
  color: #ffffff;
}
#right{

  bottom: 290px;
  right: 1px;
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

  color: #fff;
}
        .circle_progress{
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
      
      /* .wrapper i:last-child {
        right: -22px;
      } */
      
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