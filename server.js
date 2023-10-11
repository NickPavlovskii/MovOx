const express = require('express');
const cors = require('cors'); // Подключите cors
const app = express();
const port = 3001;

const moviesData = require('./src/components/kinopoisk.json'); // Подключаем файл с данными фильмов
const movies = moviesData.docs; // Извлеките массив фильмов из 'docs'

app.use(cors()); // Используйте cors middleware
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
