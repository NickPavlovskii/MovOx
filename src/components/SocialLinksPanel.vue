<template>
  <div>
    <nav class="social">
      <ul>
        <li>
          <a
            href="https://vk.com/o_0niklad0_o"
            aria-label="Vk Profile"
          >
            Vk
            <i>
              <font-awesome-icon
                icon="fa-brands fa-vk icn"
                class="icn"
              />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://t.me/N1klad"
            aria-label="Telegram Profile"
          >
            Telegram
            <i>
              <font-awesome-icon
                icon="fa-brands fa-telegram icn"
                class="icn"
              />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/"
            aria-label="WhatsApp"
          >
            WhatsApp
            <i>
              <font-awesome-icon
                icon="fa-brands fa-whatsapp"
                class="icn"
              />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/o__niklad__o/?hl=ru"
            aria-label="Instagram Profile"
          >
            Instagram
            <i>
              <font-awesome-icon
                icon="fa-brands fa-instagram"
                class="icn"
              />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/o-niklad"
            aria-label="GitHub Profile"
          >
            GitHub
            <i>
              <font-awesome-icon
                icon="fa-brands fa-github"
                class="icn"
              />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/o-niklad"
            aria-label="GitLab Profile"
          >
            GitLab
            <i>
              <font-awesome-icon
                icon="fa-brands fa-gitlab"
                class="icn"
              />
            </i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faInstagram,
  faDiscord,
  faWhatsapp,
  faVk,
  faTelegram,
  faGitlab,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faGithub,
  faInstagram,
  faDiscord,
  faWhatsapp,
  faVk,
  faTelegram,
  faGitlab
);

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.social {
  z-index: 999;
  position: fixed;
  top: 400px;
}
.social a {
  color: #fff;
  text-decoration: none;
}

@media (max-width: 1000px) {
  .social {
    display: none;
  }
}

.social ul {
  padding: 0px;
  transform: translate(-270px, 0);
  margin-left: 13px;
}

.social ul li {
  display: block;
  margin: 5px;
  background: rgba(0, 0, 0, 0.36);
  width: 300px;
  text-align: right;
  padding: 10px;
  border-radius: 0 30px 30px 0;
  transition: all 1s;
}

.social ul li:hover {
  transform: translate(110px, 0);
  background: rgba(255, 255, 255, 0.4);
}

.social ul li:hover a {
  color: #000;
}

.social ul li i:hover .icn {
  transform: rotate(360deg);
  transition: all 1s;
}

.social ul li i {
  margin-left: 40px;
  color: #000;
  background: #fff;
  padding: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 20px;
  background: #ffffff;
  transform: rotate(0deg);
}

body {
  background: #25343f;
  color: #fff;
  font-family: "Raleway", sans-serif;
}
</style>
