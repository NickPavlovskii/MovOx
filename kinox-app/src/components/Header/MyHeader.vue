<template>
    <header class="header">
 <div  style="display: flex;">
        <div class="logo" >
          <img src="../../assets/Icon2.png" alt="" />
          <p>KinOx</p>
        </div>
        <ul class="menuItems">
          <li class="menuItem">Movies</li>
          <li class="menuItem">TV Shows</li>
          <font-awesome-icon icon="search" />
          <!-- <li class="menuItem">
          <VIcon name="search" />
        </li> -->
        </ul>
        <div class="mobileMenuItems">
        <HiOutlineSearch/>
        <template>
          <VscChromeClose  />
        </template>
        <template>
          <SlMenu />
        </template>
      </div>

        
      </div>
      <!-- <div class="searchBar" >
      
          <div class="searchInput">
            <input type="text" placeholder="Search for a movie or TV show..." />
          
          </div>
      
      </div> -->
    </header>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  
  library.add(faSearch)
  
  export default {
    components: {
      FontAwesomeIcon
    }
  }
  </script>


  <style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #222;
    color: white;
    display: flex;
    align-items: center;

  }
  
  .header .headerContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header .logo {
  display: flex;
  align-items: center;
}

.header .logo img {
  height: 50px;
  margin-right: 10px;
}

.header .logo p {
  font-size: 18px;
  font-weight: bold;
}

.header .menuItems {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-left: auto;
}
  
  .header .menuItems .menuItem {
    margin-right: 15px;
    cursor: pointer;
  }
  
  .header .menuItems .menuItem:hover {
    color: #ccc;
  }
  
  .header .searchBar {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  
  .header .searchInput {
    position: relative;
  }
  
  .header .searchInput input {
    width: 200px;
    height: 30px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
  }
  
  .header .searchInput input:focus {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  }
  
  .header .mobileMenuItems {
    display: none;
  }
  
  .header .mobileMenuItems {
  display: none;
}

@media (max-width: 768px) {
  .header .menuItems {
    display: none;
  }

  .header .mobileMenuItems {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .header .searchBar {
    justify-content: flex-end;
  }
}
  </style>