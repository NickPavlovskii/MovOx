const express = require('express');
const app = express();

// Загружаем JSON с данными
const jsonData = require('./kinopoisk.json');

// Определяем маршрут для получения всех данных
app.get('/', (req, res) => {
  res.send('Server is running'); // Отправляем простой текстовый ответ
});


// Определяем маршрут для получения данных по идентификатору
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const data = jsonData.find(item => item.id === id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

// Запускаем сервер
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
