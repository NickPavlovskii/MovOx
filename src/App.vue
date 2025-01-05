<template>
  <div id="app">
    <MainHeader @search="updateSearchQuery" />
    <router-view/> 
    <MainFooter />

  </div>
</template>

<script>

import "../style/PrimeVue.css";
import MainHeader from "./components/Header/MainHeader.vue";
import MainFooter from "./components/Footer/MainFooter.vue";

import { mapState, mapActions } from "vuex";
//
export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
  computed: {
    ...mapState([ 'movie', "movies", "filteredMovies"]),
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods: {
    ...mapActions([ 'movie',"fetchMovies", "selectMovie", "searchMovies"]),

    changePage(page) {
      this.currentPage = page;
    },
    updateSearchQuery(query) {
      this.$store.commit("setSearchQuery", query);
      this.currentPage = 1;
      this.searchMovies();
    },
  },
};
</script>

<style>
#app {
  background: #04152d;
}
</style>
