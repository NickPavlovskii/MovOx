<template>
  <div class="overlay">
    <router-link :to="{ name: 'movie-details', params: { id: movie.id } }"
      style="cursor: pointer; text-decoration: none; list-style-type: none;">
      <div class="movie-poster">
        <img :src="movie.poster.url" alt="Постер фильма" class="poster-image">
        <div class="description-overlay">
          <div class="shortDescription">
            <p>{{ movie.shortDescription }}</p>
            <div class="row">
              <div class="info">
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
          </div>
        </div>
      </div>
      <div class="movie-details">
        <circle-progress 
        class="circle_progress" 
        :viewport="true" 
        :on-viewport="movie.rating.kp.toFixed(1)" 
        :size="60"
        :background="'white'" 
        :is-gradient="true" 
        :percent="movie.rating.kp * 10" 
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
          :border-bg-width="5">
        </circle-progress>
        <span class="ratingtext">{{ movie.rating.kp.toFixed(1) }}</span>
        <h3 class="movie-name">{{ movie.name }}</h3>
        <div class="year">{{ movie.year }}</div>
      </div>
    </router-link>
    <div class="icons">

      <font-awesome-icon icon="bookmark" class="bookmark" :class="{ active: isBookmarked }"
        @click.stop="toggleBookmark($event)" />

    </div>
  </div>
</template>
  

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import CircleProgress from "vue3-circle-progress";
library.add(faBookmark)
library.add(faHeart)

export default {

components: {
  FontAwesomeIcon,
  CircleProgress
},
props: {
  movie: {
    type: Object,
    required: true,
  },
},
data() {
  return {
    isBookmarked: false,
    hasRating: false
  };
},
created() {
  const bookmarkKey = `bookmark_${this.movie.id}`;
  const ratingKey = `rating_${this.movie.id}`;

  // Проверяем сохраненные значения в локальном хранилище
  if (localStorage.getItem(bookmarkKey) === 'true') {
    this.isBookmarked = true;
  }

  if (localStorage.getItem(ratingKey) === 'true') {
    this.hasRating = true;
  }
},
computed: {
  bookmarkKey() {
    return `bookmark_${this.movie.id}`;
  },
  ratingKey() {
    return `rating_${this.movie.id}`;
  },
},
watch: {
  isBookmarked(value) {
    localStorage.setItem(this.bookmarkKey, value.toString());
  },
  hasRating(value) {
    localStorage.setItem(this.ratingKey, value.toString());
  },
},
methods: {
  toggleBookmark(event) {
    event.stopPropagation();
    this.isBookmarked = !this.isBookmarked;
  },
  rateMovie(event) {
    event.stopPropagation();
    this.hasRating = !this.hasRating;
  },
  convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  },
},
};
</script>

<style scoped>
.text {
  margin-right: 5px;
  opacity: 0.5;
  line-height: 24px;

}


.row {
display: flex;
align-items: center;
gap: 25px;
justify-content: center;
position: relative;
bottom: 10px;

  
}

.info {
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
padding: 15px 0;
display: flex;
}

.info .infoItem {
margin-right: 10px;
display: flex;
flex-flow: row wrap;

}

.icons {
display: flex;
flex-direction: column;
align-items: flex-end;
margin-bottom: 30px;
opacity: 0.7;
}

.bookmark{
  margin-right: 1px;
}

.bookmark:hover {
color: #ff0000; /* Цвет активного состояния */
}
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
opacity: 0.7;
  line-height: 24px;

}








.circle_progress {
position: absolute;
bottom: 70px;
left: 10px;
color: #ffffff;
}

.circle_progress .percentage {
color: black;
}

.ratingtext {
position: relative;
bottom: 110px;
margin-left: 26px;
font-size: 21px;
color: #020c1b;
font-weight: bold;
text-align: center;
}

.container {
max-width: 960px;
margin: 0 auto;
padding: 20px;
color: #fff;
}

.movie-list {
list-style: none;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-gap: 20px;
}

.movie-item {
padding: 10px;
}

.movie-poster {
text-align: center;
border-radius: 8px;
margin-right: 30px;
}

.poster-image {
max-width: 100%;
height: auto;
border-radius: 11px;
}

.movie-details {
padding-top: 10px;
width: 100%;
color: white;
height: 80px;
}

.movie-name {
font-size: 19px;
margin-bottom: 5px;
position: relative;
bottom: 90px;
font-weight: bold;
width: 180px;
}

.movie-info {
display: flex;
align-items: center;
}

.year {
font-size: 16px;
color: #888;
position: relative;
bottom: 90px;
}
</style>

<style scoped>
.overlay{
  height: 100%;
  width: 100%;
}
.icons {
position: relative;
bottom: 397px;
left: 75px;
transform: translate(-50%, -50%);
opacity: 0;


}
.bookmark {
opacity: 0;
margin-right: 1px;
}
.overlay:hover .bookmark{
opacity: 1; 

}

.bookmark.active {
opacity: 2; 
color: red;
}





.text {
   
    margin-right: 5px;
    
    opacity: 0.5;
    line-height: 24px;

}

.row {
  display: flex;
  align-items: center;
  gap: 25px;
  justify-content: center;
  position: relative;
 bottom: 10px;

    
}

.info {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;
  display: flex;
}

.info .infoItem {
  margin-right: 10px;
  display: flex;
  flex-flow: row wrap;
  
}
.icons .bookmark.active {
display: block;
}
.movie-poster:hover + .icons {
opacity: 1;
}

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
  opacity: 0.7;
    line-height: 24px;

}



.circle_progress {
  position: absolute;
  bottom: 70px;
  left: 10px;
  color: #ffffff;
}



.movie-poster {
  text-align: center;
  border-radius: 8px;
  margin-right: 30px;
}

.poster-image {
  max-width: 100%;
  height: auto;
  border-radius: 11px;
}

.movie-details {
  padding-top: 10px;
  width: 100%;
  color: white;
  height: 80px;
}

.movie-name {
  font-size: 19px;
  margin-bottom: 5px;
  position: relative;
  bottom: 90px;
  font-weight: bold;
  width: 180px;
}

.movie-info {
  display: flex;
  align-items: center;
}

.year {
  font-size: 16px;
  color: #888;
  position: relative;
  bottom: 90px;
}
</style>
