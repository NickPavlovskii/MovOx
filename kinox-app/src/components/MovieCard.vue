<template>
    <div class="movie-card">
      <img :src="fetchedMovie.poster.url" alt="Постер фильма" />
      <h3>{{ fetchedMovie.name }}</h3>
      <p>{{ fetchedMovie.description }}</p>
      <p>Рейтинг (КиноПоиск): {{ fetchedMovie.rating.kp }}</p>
      <p>Рейтинг (IMDb): {{ fetchedMovie.rating.imdb }}</p>
      <p>Год: {{ fetchedMovie.year }}</p>
      <p>Голоса (КиноПоиск): {{ fetchedMovie.votes.kp }}</p>
      <p>Голоса (IMDb): {{ fetchedMovie.votes.imdb }}</p>
      <p>Длительность фильма: {{ fetchedMovie.movieLength }} минут</p>
      <div v-if="fetchedMovie.watchability && fetchedMovie.watchability.items.length > 0">
        <p>Доступно на:</p>
        <ul>
          <li v-for="item in fetchedMovie.watchability.items" :key="item._id">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['movie'],
    data() {
  return {
    fetchedMovie: []
  };
},

    created() {
      this.fetchMovieData();
    },
    fetchMovieData() {
      // Замените этот код на вызов API для получения данных фильма
      // В этом примере я просто присваиваю статические данные фильма напрямую fetchedMovie
      this.fetchedMovie = [
            {
          "externalId": {
            "kpHD": "4127663ed234fa8584aeb969ceb02cd8",
            "imdb": "tt1675434",
            "tmdb": 77338,
            "_id": "6376b9837ad98299ff922212"
          },
          "logo": {
            "_id": "62f767e7252c8469effb6268",
            "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig"
          },
          "poster": {
            "_id": "6339779fc22d011bb5646e03",
            "url": "https://st.kp.yandex.net/images/film_big/535341.jpg",
            "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg"
          },
          "rating": {
            "_id": "6339779fc22d011bb5646e01",
            "kp": 8.805,
            "imdb": 8.5,
            "filmCritics": 6.8,
            "russianFilmCritics": 100,
            "await": 0
          },
          "votes": {
            "kp": 1529613,
            "imdb": 866329,
            "filmCritics": 130,
            "russianFilmCritics": 12,
            "await": 15,
            "_id": "63e7c63f68d824d6caf18e3b"
          },
          "watchability": {
            "items": [
              {
                "logo": {
                  "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  "_id": "63e7c63f68d824d6caf18e85"
                },
                "name": "Okko",
                "url": "https://okko.tv/movie/intouchables?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                "_id": "63e7c63f68d824d6caf18e84"
              },
              {
                "logo": {
                  "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                  "_id": "63e7c63f68d824d6caf18e87"
                },
                "name": "START",
                "url": "https://start.ru/watch/1-1?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=1-1",
                "_id": "63e7c63f68d824d6caf18e86"
              }
            ],
            "_id": "63e7c63f68d824d6caf18e83"
          },
          "movieLength": 112,
          "id": 535341,
          "type": "movie",
          "name": "1+1",
          "description": "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
          "year": 2011,
          "alternativeName": "Intouchables",
          "enName": null,
          "names": [
            {
              "_id": "6339779fc22d011bb5646dff",
              "name": "1+1"
            },
            {
              "_id": "6339779fc22d011bb5646e00",
              "name": "Intouchables"
            }
          ],
          "shortDescription": "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
          "releaseYears": []
        },  
        {
      "externalId": {
        "kpHD": "47649cf90de74aca8da7eb5b17fc8a8a",
        "imdb": "tt8367814",
        "tmdb": 522627,
        "_id": "6376b9787ad98299ff91685f"
      },
      "logo": {
        "_id": "62f5427d252c8469ef8b44f9",
        "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f18064fd95abb74cbcc02873b8/orig"
      },
      "poster": {
        "_id": "6339eb5489ae969da213a33e",
        "url": "https://st.kp.yandex.net/images/film_big/1143242.jpg",
        "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg"
      },
      "rating": {
        "kp": 8.536,
        "imdb": 7.8,
        "filmCritics": 6.5,
        "russianFilmCritics": 86.3636,
        "await": 97.92,
        "_id": "63e647b968d824d6ca7a0fbf"
      },
      "votes": {
        "kp": 1284199,
        "imdb": 347206,
        "filmCritics": 275,
        "russianFilmCritics": 22,
        "await": 13643,
        "_id": "63e647b968d824d6ca7a0fc0"
      },
      "watchability": {
        "items": [
          {
            "logo": {
              "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
              "_id": "63e647b968d824d6ca7a0fc4"
            },
            "name": "Okko",
            "url": "https://okko.tv/movie/the-gentlemen?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
            "_id": "63e647b968d824d6ca7a0fc3"
          },
          {
            "logo": {
              "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
              "_id": "63e647b968d824d6ca7a0fc6"
            },
            "name": "KION",
            "url": "https://kion.ru/video/movie/169735638?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
            "_id": "63e647b968d824d6ca7a0fc5"
          },
          {
            "logo": {
              "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
              "_id": "63e647b968d824d6ca7a0fc8"
            },
            "name": "Триколор Кино и ТВ",
            "url": "https://kino.tricolor.tv/watch/dzhentlmeny-2019/?utm_source=yandex&utm_medium=feed",
            "_id": "63e647b968d824d6ca7a0fc7"
          },
          {
            "logo": {
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
              "_id": "63e647b968d824d6ca7a0fca"
            },
            "name": "Wink",
            "url": "https://wink.ru/media_items/95724717?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
            "_id": "63e647b968d824d6ca7a0fc9"
          },
          {
            "logo": {
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
              "_id": "63e647b968d824d6ca7a0fcc"
            },
            "name": "МегаФон ТВ",
            "url": "https://megafon.tv/movies/vods/Dzhentlmeny_2019?utm_source=yandex&utm_medium=wizard&utm_campaign=Dzhentlmeny_2019",
            "_id": "63e647b968d824d6ca7a0fcb"
          }
        ],
        "_id": "63e647b968d824d6ca7a0fc2"
      },
      "movieLength": 113,
      "id": 1143242,
      "type": "movie",
      "name": "Джентльмены",
      "description": "Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.",
      "year": 2019,
      "alternativeName": "The Gentlemen",
      "enName": null,
      "names": [
        {
          "_id": "6339eb5489ae969da213a33a",
          "name": "Джентльмены"
        },
        {
          "_id": "6339eb5489ae969da213a33b",
          "name": "The Gentlemen"
        }
      ],
      "color": "#DBCCC2",
      "shortDescription": "Наркобарон хочет уйти на покой, но криминальный мир не отпускает. Успешное возвращение Гая Ричи к корням",
      "releaseYears": []
    }

]
    }
  };
  </script>



<style scoped>
.movie-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.movie-card img {
  max-width: 100%;
}

.movie-card h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.movie-card p {
  margin-bottom: 10px;
}

.movie-card ul {
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

.movie-card ul li {
  margin-bottom: 5px;
}

.movie-card ul li a {
  text-decoration: none;
}
</style>

  
  