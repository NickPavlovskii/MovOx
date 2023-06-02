<template>
    <div class="header">
       
       <div class="logo">

            <img src="../assets/Icon.png" class="logo_icn" />
            <p>KinOx</p>
        </div>
   
        <div class="title" v-if="!showSearch">Фильмы, Сериалы, Мультфильмы</div>
      <div class="search-icon" @click="toggleSearch">
        <img src="search-icon.png" alt="Иконка поиска" />
        
      </div> 
      <div class="search-input" v-if="showSearch">
        <input type="text" placeholder="Поиск" />

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showSearch: false,
      };
    },
    methods: {
      toggleSearch() {
        this.showSearch = !this.showSearch;
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #D97925;
  }
  
  .logo{
    color: #ffffff;
    display: flex;
    
    align-items: center;
  }
  .logo_icn {
   
    width: 60px;
    height: 60px;
    
    font-size: 24px;
    font-weight: bold;

  }
  
  .title {
    font-size: 18px;
  }
  
  .search-icon {
    cursor: pointer;
  }
  
  .search-icon img {
    width: 24px;
    height: 24px;
  }
  
  .search-input input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  