// server.js
const express = require('express');
const app = express();
const port = 3000;

const movies = require('./kinopoisk.json'); // Подключаем файл с данными фильмов

app.use(express.json());

// Получить список всех фильмов
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Получить информацию о фильме по идентификатору
app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find((movie) => movie.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Фильм не найден' });
  }
});

// Запустить сервер
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
