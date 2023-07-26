// import { createApp } from "vue";
import Vuex from "vuex";
import axios from "axios";
import 'es6-promise/auto';

let store = new Vuex.Store({
  state: {
    weatherKey: '11659ff417082e7e590aef9d553f793e',
    ipKey: '29a35d4acd88cbe3c8139e9b3f243290',
    city: '',
    lat: '',
    long: '',
    weatherNow: '',
    weatherByHours5days: '',
    lang: 'en',
    units: 'metric',
    games: [],

  },
  mutations: {
    SET_CITY_TO_STATE: (state, city) => {
      state.city = city;
    },
    SET_LAT_TO_STATE: (state, lat) => {
      state.lat = lat;
    },
    SET_LONG_TO_STATE: (state, long) => {
      state.long = long;
    },
    SET_CITY_WEATHER_NOW_TO_STATE: (state, weatherNow) => {
      state.weatherNow = weatherNow;
    },
    SET_CITY_WEATHER_5D_TO_STATE: (state, weatherByHours5days) => {
      state.weatherByHours5days = weatherByHours5days;
    },

    SET_FAVORITE: (state, favoriteGame) => {
      if (state.favorite.length) {
        let isGameExists = false;
        state.favorite.map(function (item) {
          if (item.id === favoriteGame.id) {
            isGameExists = true;
          }
        });
        if (!isGameExists) {
          state.favorite.push(favoriteGame);
        }
      } else {
        state.favorite.push(favoriteGame);
      }
    },
    DELETE_FROM_FAVORITE: (state, favoriteGameIndex) => {
      state.favorite.splice(favoriteGameIndex, 1);
    }
  },
  actions: {
    GET_CITY_BY_IP({ commit }) {
      if (this.state.city == '') {
        return axios.get(`https://api.ipify.org?format=json`)
          .then((response) =>
            axios.get(`http://api.ipapi.com/api/${response.data.ip}?access_key=${this.state.ipKey}`)
          )
          .then((response) => {
            commit("SET_CITY_TO_STATE", response.data.city);
            commit("SET_LAT_TO_STATE", response.data.latitude);
            commit("SET_LONG_TO_STATE", response.data.longitude);
            return response;
          }).catch((error) => {
            return error;
          });
      }
    },

    GET_CITY_WEATHER_NOW_FROM_API({ commit }) {
      if (this.state.city !== '') {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.weatherKey}&lang=${this.state.lang}&units=${this.state.units}`)
        .then((response) => {
          commit("SET_CITY_WEATHER_NOW_TO_STATE", response.data);
          commit("SET_LAT_TO_STATE", response.data.coords.lat);
          commit("SET_LONG_TO_STATE", response.data.coords.lon);
          return response;
        }).catch((error) => {
          return error;
        });
      }
    },
    GET_CITY_WEATHER_5D_FROM_API({ commit }) {
      if (this.state.city !== '') {
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${this.state.weatherKey}&lang=${this.state.lang}&units=${this.state.units}`)
        .then((response) => {
          commit("SET_CITY_WEATHER_5D_TO_STATE", response.data);
          commit("SET_LAT_TO_STATE", response.data.city.coord.lat);
          commit("SET_LONG_TO_STATE", response.data.city.coord.lon);
          return response;
        }).catch((error) => {
          return error;
        });
      }
    },

  },
  getters: {
    CITY(state) {
      return state.city;
    },
    LONG(state) {
      return state.long;
    },
    LAT(state) {
      return state.lat;
    },
    CITY_WEATHER_NOW(state) {
      return state.weatherNow;
    },
    CITY_WEATHER_5D(state) {
      return state.weatherByHours5days;
    },
  },

});

export default store;
