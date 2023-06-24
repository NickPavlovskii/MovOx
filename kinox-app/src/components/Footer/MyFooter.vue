<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-column">
          <h4>О нас</h4>
          <p>Добро пожаловать на наш сайт поиска кино! Мы предлагаем широкий выбор фильмов различных жанров, режиссеров и актеров. У нас вы найдете описания, рейтинги, отзывы и трейлеры фильмов. Мы обновляем базу данных, чтобы предоставить вам последние новинки. Ищите фильмы по ключевым словам или именам актеров. Наслаждайтесь просмотром вместе с нами!</p>
        </div>
        <div class="footer-column">
          <h4>Категории</h4>
          <ul>
            <li><a href="#">Боевик</a></li>
            <li><a href="#">Комедия</a></li>
            <li><a href="#">Драма</a></li>
            <li><a href="#">Фэнтези</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Контакты</h4>
          <p>Email: o_oniklado_o@list.ru</p>
          <p>Телефон: 89816921718</p>
          <!-- <div class="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="facebook" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="twitter" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="instagram" />
            </a>
          </div> -->
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Niklad 2023 My Movie App. Все права защищены.</p>
      </div>
    </footer>
  </template>
  
  <script>

  export default {
    components: {
    //   FontAwesomeIcon,
    },
  }
  </script>
  
  
  <style lang="scss" scoped>
  .footer {
    background-color: #020c1b;
    color: #ffffff;
    padding: 20px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .footer-column {
    flex: 1 1;
    margin-bottom: 20px;
  }
  
  .footer h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .footer p {
    margin-bottom: 5px;
  }
  
  .footer ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer ul li {
    margin-bottom: 5px;
  }
  
  .footer ul li a {
    color: #ffffff;
    text-decoration: none;
  }
  
  .social-links {
    margin-top: 10px;
  }
  
  .social-links a {
    display: inline-block;
    margin-right: 10px;
    color: #ffffff;
    text-decoration: none;
  }
  
  .footer-bottom {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  