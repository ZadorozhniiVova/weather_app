<script setup>
import IconClose from './icons/IconClose.vue'
</script>

<template>
  <div class="weather-card" v-if="response">
    <IconClose @click="removeFromFavorite($event, response.name)" />
    <div class="weather-card__date">
      {{ new Date(response.dt * 1000).toLocaleTimeString() }}
    </div>
    <div class="weather-card__location">{{ response.name }}, {{ response.sys.country }}</div>
    <div class="weather-card__forecast">
      <img
        v-if="response.weather[0].icon"
        class="weather-card__icon"
        :src="`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`"
      />
      <span>{{ Math.round(response.main.temp) }}<span> &#8451;</span></span>
    </div>
    <p className="weather-card__description">
      Feels like {{ Math.round(response.main.feels_like) }}°C.
      {{
        response.weather[0].description.charAt(0).toUpperCase() +
        response.weather[0].description.slice(1)
      }}
    </p>
    <div class="weather-card__info">
      <p>Wind: {{ Math.round(response.wind.speed * 3.6) }} km/h</p>
      <p>Pressure: {{ response.main.pressure }} hPa</p>
      <p>Humidity: {{ response.main.humidity }} %</p>
      <p>Visibility: {{ response.visibility / 1000 }} km</p>
    </div>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  data() {
    return {}
  },
  props: ['response'],

  methods: {
    removeFromFavorite(event, cityName) {
      bus.emit('cityName', { cityName: cityName })
      bus.emit('isDeleteModal', { isDeleteModal: true })
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.weather-card {
  color: white;
  border-radius: 8px;
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
  background: linear-gradient(315deg, #2b2b2b, #333333);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
}

.weather-card__location {
  font-size: 30px;
  margin-top: 0.4rem;
  font-weight: bolder;
}
.weather-card__forecast {
  display: grid;
  grid-template-columns: 125px 1fr;
  gap: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
}
.weather-card__forecast img {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.4rem;
  width: 100%;
  object-fit: contain;
}

.weather-card__forecast span {
  font-size: 50px;
  line-height: 1;
}

.weather-card__info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 5px;
}

.weather-card__description {
  font-weight: bolder;
  margin-bottom: 0.4rem;
  margin-top: 1.1rem;
}

@media (max-width: 768px) {
  .weather-card {
    display: grid;
    border-radius: 30px;
  }
  .weather-card__date {
    display: none;
  }
  .weather-card__location {
    margin-top: 0;
  }

  .weather-card__info p {
    font-size: 12px;
  }
  .weather-card__location {
    font-size: 20px;
    margin-top: 0.4rem;
    font-weight: bolder;
  }
  .weather-card__forecast span {
    font-size: 30px;
    line-height: 1;
  }
}
</style>
