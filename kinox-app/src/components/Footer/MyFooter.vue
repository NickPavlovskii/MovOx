<template>
  <footer class="footer">

    <div class="footer-content">
      <div class="footer-column">
        <h4>О нас</h4>
        <p>Добро пожаловать на наш сайт поиска кино!
          Исследуйте бесконечную вселенную фильмов и найдите идеальный жанр для себя.
          У нас есть огромный каталог фильмов, включающий все возможные жанры,
          чтобы удовлетворить самый разнообразный вкус.</p>
      </div>
      <div class="footer-column">
        <h4>Категории</h4>
        <ul style="display: flex; flex-direction: column;  ">
        
          <router-link :to="{ path: '/Боевик' }" style="color: white; text-decoration: none;" >
            <a>Боевик</a> 
          </router-link>
          <router-link :to="{ path: '/Комедия' }" style="color: white; text-decoration: none;">
            <a>Комедия</a>
          </router-link>
          <router-link :to="{ path: '/Драма' }" style="color: white; text-decoration: none;">
            <a>Драма</a>
          </router-link>
          <router-link :to="{ path: '/Фэнтези' }" style="color: white; text-decoration: none;">
            <a>Фэнтези</a>
          </router-link>
          <router-link :to="{ path: '/Фантастика' }" style="color: white; text-decoration: none;">
            <a>Фантастика</a>
          </router-link>
          
        </ul>
      </div>
     
      <div class="footer-column">
        <h4>Контакты</h4>
        <p>Email: o_oniklado_o@list.ru</p>
        <p>Телефон: 89816921718</p>
        <div class="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="fa-brands fa-vk icn"  class="icn"/>
            </a>
            <a href="https://t.me/N1klad">
        <font-awesome-icon icon="fa-brands fa-telegram icn" class="icn" />
      </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="fa-brands fa-whatsapp"  class="icn"/>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="fa-brands fa-github" class="icn" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon icon="fa-brands fa-gitlab icn" class="icn" />
            </a>
          </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; Niklad 2023 My Movie App. Все права защищены.</p>
    </div>
  </footer>
</template>
  
<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab);



export default {
  components: {
    FontAwesomeIcon,
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

  margin-bottom: 20px;
}

.footer h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.footer p {
  margin-bottom: 5px;
  width: 500px;
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
  display: flex ;
  text-align: center;
  justify-content: center;
}
</style>
  