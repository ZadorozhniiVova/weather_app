<script setup>
import { RouterLink, RouterView } from 'vue-router'
import weatherHeader from './components/weatherHeader.vue'
import weatherChart from './components/weatherChart.vue'
</script>

<template>
  <weatherChart />
  <weatherHeader />
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Main</RouterLink>
      <RouterLink to="/favorite" :class="{ show: isFavorite }">Favorite</RouterLink>
    </nav>
    <router-view> </router-view>
  </div>

  <!-- <RouterView /> -->
</template>
<script>
export default {
  data() {
    return {
      isFavorite: false,
      local: ''
    }
  },
  mounted() {
    if (localStorage.favorite) {
      this.local = localStorage.favorite
    }
  },
  watch: {
    local(newName) {
      this.isFavorite = true
    }
  }
}
</script>

<style >
#app {
  font-family: arial, sans-serif;
  padding: 0 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
}
.weather-box-icon {
  width: 50px;
  height: 50px;
}

.wrapper {
  max-width: 1248px;
  padding-bottom: 50px;
  margin: 0 auto;
  width: 100%;
}
.wrapper main {
  border-radius: 0 30px 30px 30px;
}
.wrapper nav {
  width: fit-content;
  display: flex;
  width: 100%;
}

.wrapper nav a {
  padding: 10px;
  border: 1px solid #9aa0a6;
}
.wrapper nav a:first-child {
  border-top-left-radius: 10px;
}

.wrapper nav a:last-child {
  border-top-right-radius: 10px;
}

.wrapper nav a.router-link-exact-active {
  background: #9aa0a6;
  color: black;
}

.wrapper main {
  border: 1px solid #9aa0a6;
  padding: 10px;
}

@media (max-width: 920px) {
  #app {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 0 10px;
  }
}
</style>
