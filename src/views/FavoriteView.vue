<script setup>
import weatherCard from '../components/weatherCard.vue'
import weatherDeleteModal from '../components/weatherDeleteModal.vue'
</script>

<template >
  <main class="favorites">
    <weatherDeleteModal />
    <router-link v-for="(item, index) in favoriteResponse" :key="index" to="/">
      <weatherCard :response="item" @click="this.$store.state.city = item.name" />
    </router-link>
  </main>
</template>

<script>
import { toRaw } from '@vue/reactivity'


export default {
  components: { weatherCard },
  data() {
    return {
      localStorageFavorite: [],
      favoriteResponse: [],
      favoriteWeatherNow: [],
      lang: 'en',
      apiKey: '122c02b19af0dabcb22cbc75f2348eac'
    }
  },
  async mounted() {
    if (localStorage.favorite) {
      this.localStorageFavorite = localStorage.favorite
    }
    let favorite = this.localStorageFavorite.split(',')

    if (favorite.length > 0) {
      try {
        const responses = await Promise.all(
          favorite.map((item) =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${this.$store.state.weatherKey}&lang=${this.$store.state.lang}&units=${this.$store.state.units}`,
              {
                method: 'GET',
                headers: {}
              }
            ).then((response) => response.json())
          )
        )
        this.favoriteWeatherNow = responses
        const rawArray = toRaw(this.favoriteWeatherNow)
        this.favoriteResponse = rawArray
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>


<style>
.favorites {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
}

.favorites a {
  height: 100%;
}
@media (max-width: 768px) {
  .favorites {
    grid-template-columns: 1fr;
  }
}
</style>
