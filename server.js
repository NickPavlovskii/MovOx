const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
// Маршрут для получения списка фильмов
app.get('/movies', (req, res) => {
  fs.readFile('./src/components/kinopoisk.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const moviesData = JSON.parse(data);
      res.json(moviesData.docs);
    }
  });
});


// Маршрут для получения фильма по ID
app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id.toString(); // Преобразуем id в строку
  fs.readFile('./src/components/kinopoisk.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const moviesData = JSON.parse(data);
      const movie = moviesData.docs.find((movie) => movie.id.toString() === movieId);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
