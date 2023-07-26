<script setup>
import axios from 'axios'
// import IconSearch from './icons/IconSearch.vue'
import iconFavorite from './icons/iconFavorite.vue'
</script>

<template>
  <div class="weather-search">
    <div class="weather-search__container">
      <div class="weather-search__box">
        <input
          placeholder="Enter Yours Location"
          type="text"
          class="weather-search__input"
          v-model="searchCity"
          @keyup="search($event)"
        />
        <!-- <IconSearch /> -->
      </div>

      <ul class="weather-search__list" :class="{ show: searchResult.length > 0 }">
        <li
          class="weather-search__item"
          v-for="(city, index) in searchResult"
          :key="index"
          :data-value="city"
          @click="findCity(city)"
        >
          {{ city }}
        </li>
      </ul>
    </div>
    <span @click="addToFavorite" class="favorite">
      <iconFavorite :favorite="this.isFavorite" />
    </span>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  data() {
    return {
      searchCity: '',
      searchResult: [],
      isEurope: true,
      weatherNow: bus.on('weatherNow', (data) => {
        this.weatherNow = data.weatherNow
      }),
      isFavorite: false,
      favorite: [],
      lang: 'en'
    }
  },
  mounted() {
    let existing = localStorage.getItem('favorite')
    if (existing !== null) {
      this.favorite = existing.split(',')
    }
    if (this.$store.state.city && this.favorite.includes(this.$store.state.city)) {
      this.isFavorite = true
    } else {
      this.isFavorite = false
    }
  },
  watch: {
    '$store.state.city': function (newCity) {
      if (newCity && this.favorite.includes(newCity)) {
        this.isFavorite = true
      } else {
        this.isFavorite = false
      }
    }
  },
  created() {},

  methods: {
    async search(event) {
      const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/places?limit=10&offset=0&types=CITY&namePrefix=${event.target.value}&sort=-population`,
        headers: {
          'X-RapidAPI-Key': '7efc6ca3dbmsh6bd82625250968cp13dc0ajsn044e55da540c',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }

      if (event.target.value.length > 2) {
        try {
          const response = await axios.request(options)
          let info = response.data.data
          if (info.length > 0) {
            this.searchResult.length = 0
            info.forEach((element) => {
              this.searchResult.push(element.name)
            })
          }
        } catch (error) {
          // console.error(error)
          return error
        }
      }
    },

    findCity(city) {
      this.searchCity = city
      this.$store.state.city = city
      this.searchResult.length = 0
      let input = document.querySelector('.weather-search__input')
      input.value = `${city}`
    },

    addToFavorite() {
      if (
        this.$store.state.city &&
        !this.favorite.includes(this.$store.state.city) &&
        this.favorite.length < 5
      ) {
        var existing = localStorage.getItem('favorite')
        existing = existing ? existing.split(',') : []
        if (!existing.find((item) => item === this.$store.state.city)) {
          existing.push(this.$store.state.city)
          localStorage.setItem('favorite', existing.toString())
          this.isFavorite = true
          this.favorite = existing
        }
      }
    }
  }
}
</script>

<style>
.weather-search {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
}

.weather-search__container {
  position: relative;
}

.weather-search__box {
  text-align: center;
  position: relative;
}

.weather-search__box img {
  transition: 0.3s ease-in-out;
}

.weather-search__input {
  text-align: left;
  border-radius: 15px 15px 0 0;
  border: 1px solid rgb(160, 160, 160);
  padding: 10px 18px 10px 10px;
  width: 250px;
  font-size: 15px;
  font-family: 'roboto';
  transition: 0.5s;
}
.weather-search__input::placeholder {
  font-family: 'roboto';
}
.weather-search__input:focus {
  outline: none;
  border-color: #212121;
  transition: 0.5s;
}

.weather-search__list {
  max-height: 100px;
  overflow: scroll;
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 0 !important;
  border-radius: 0 0 15px 15px;
  background: rgba(255, 255, 255, 0.7);
  border: 0;
  color: black;
  padding: 0 !important;
  width: 100%;
  font-family: 'roboto';
  transition: 0.5s;
  z-index: 150;
}
.weather-search__list::-webkit-scrollbar {
  width: 0;
}

.weather-search__list {
  -ms-overflow-style: none;
}

.weather-search__list {
  overflow: -moz-scrollbars-none;
}

.weather-search__list.show {
  max-height: 150px !important;
  border: 1px solid rgb(160, 160, 160);
}

.weather-search__item {
  list-style: none;
  cursor: pointer;
  padding: 5px 10px;
}
.weather-search__item:hover {
  background: rgba(160, 160, 160, 0.6);
}

.favorite {
  background: lightblue transparent;
  width: 150px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.favorite:active svg {
  transform: scale(1.04);
}

.favorite svg {
  height: 24px;
  width: 24px;
}

@media (max-width: 920px) {
  .weather-search__container {
    width: 100%;
  }

  .favorite {
    width: 100px;
  }

  .weather-search__input {
    width: 100%;
  }
  .favorite svg {
    height: 36px;
    width: 36px;
  }

  .weather-search__list.show {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .favorite {
    width: 50px;
  }
}
</style>
