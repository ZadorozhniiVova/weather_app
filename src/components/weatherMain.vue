<script setup>
import weatherSearch from './weatherSearch.vue'
import highcharts from 'highcharts-vue'
</script>

<template>
  <div class="weather">
    <weatherSearch />
    <div class="weather__container" v-if="CITY_WEATHER_NOW">
      <div class="weather__info">
        <div class="weather__forecast">
          <div class="weather__forecast-top">
            <img
              v-if="CITY_WEATHER_NOW.weather[0].icon"
              class="weather-forecast-icon"
              :src="`http://openweathermap.org/img/wn/${CITY_WEATHER_NOW.weather[0].icon}@2x.png`"
            />
            <span>{{ Math.round(CITY_WEATHER_NOW.main.temp) }}<span> &#8451; </span></span>
          </div>

          <div class="weather__forecast-bottom">
            <span> {{ wind }}: {{ Math.round(CITY_WEATHER_NOW.wind.speed * 3.6) }} km/h </span>
            <span> {{ humidity }}: {{ CITY_WEATHER_NOW.main.humidity }}% </span>
            <span> {{ pressure }}: {{ CITY_WEATHER_NOW.main.pressure }} hPa </span>
          </div>
        </div>

        <div class="weather__additional">
          <h1>
            {{ CITY_WEATHER_NOW.name }},
            <span v-if="CITY_WEATHER_NOW.sys.country">{{ CITY_WEATHER_NOW.sys.country }}</span>
          </h1>
          <p class="weather__date">{{ new Date(CITY_WEATHER_NOW.dt * 1000) }}</p>
          <p class="weather__short">
            {{
              CITY_WEATHER_NOW.weather[0].description.charAt(0).toUpperCase() +
              CITY_WEATHER_NOW.weather[0].description.slice(1)
            }}
          </p>
        </div>
      </div>

      <div class="wether__chart" v-if="CITY_WEATHER_5D">
        <div class="tab-buttons">
          <div class="weather__filter">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              class="button"
            >
              {{ tab.title }}
            </button>
          </div>
          <div class="weather__days">
            <button
              class="weather__filter button"
              v-for="(filter, index) in weatherFilter"
              :key="index"
              v-on:click="setHours(filter.interval)"
            >
              {{ filter.days }} day(s)
            </button>
          </div>
        </div>
        <div
          class="tab-content"
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="activeTab === index"
        >
          <highcharts :options="tab.content"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      city: this.CITY,
      weather5dList: [],
      hoursFilter: 9,
      weatherFilter: [
        { days: 1, interval: 8 },
        { days: 3, interval: 24 },
        { days: 5, interval: 40 }
      ],
      isActive: false,

      wind: 'Wind speed',
      humidity: 'Humidity',
      pressure: 'Pressure',

      activeTab: 0,
      tabs: [
        {
          title: 'Temperature',
          content: {
            chart: {
              zoomType: 'x',
              backgroundColor: '#ffffffd5'
            },
            name: 'Weather',
            marker: {
              symbol: 'square'
            },
            title: {
              text: 'Temperature forecast'
            },
            subtitle: {
              text:
                document.ontouchstart === undefined
                  ? 'Click and drag in the plot area to zoom in'
                  : 'Pinch the chart to zoom in',
              align: 'left'
            },
            xAxis: {
              categories: [],
              accessibility: {
                description: 'Months of the year'
              }
            },
            yAxis: {
              type: 'datetime',
              title: {
                text: 'Temperature'
              },
              labels: {
                format: '{value}°'
              }
            },
            series: [
              {
                name: this.$store.state.city,
                marker: {
                  symbol: 'circle'
                },
                data: []
              }
            ],
            tooltip: {
              crosshairs: true,
              shared: true
            },
            plotOptions: {
              spline: {
                marker: {
                  radius: 4,
                  lineColor: '#000000',
                  lineWidth: 1
                }
              },

              line: {
                dataLabels: {
                  enabled: true
                },
                enableMouseTracking: false,
                color: '#999999'
              }
            }
          }
        },
        {
          title: 'Wind',
          content: {
            chart: {
              backgroundColor: '#ffffffd5',
              zoomType: 'x'
            },
            name: 'Weather',
            marker: {
              symbol: 'square'
            },
            title: {
              text: 'Wind forecast'
            },
            subtitle: {
              text:
                document.ontouchstart === undefined
                  ? 'Click and drag in the plot area to zoom in'
                  : 'Pinch the chart to zoom in',
              align: 'left'
            },
            xAxis: {
              categories: [],
              accessibility: {
                description: 'Months of the year'
              }
            },
            yAxis: {
              title: {
                text: 'Wind'
              },
              labels: {
                format: '{value} km/h'
              }
            },
            series: [
              {
                name: this.$store.state.city,
                marker: {
                  symbol: 'circle'
                },
                data: []
              }
            ],
            tooltip: {
              crosshairs: true,
              shared: true
            },
            plotOptions: {
              spline: {
                marker: {
                  radius: 4,
                  lineColor: '#000000',
                  lineWidth: 1
                }
              },

              line: {
                dataLabels: {
                  enabled: true
                },
                enableMouseTracking: false,
                color: '#999999'
              }
            }
          }
        },
        {
          title: 'Pressure',
          content: {
            chart: {
              backgroundColor: '#ffffffd5',
              zoomType: 'x'
            },
            name: 'Weather',
            marker: {
              symbol: 'square'
            },
            title: {
              text: 'Pressure forecast'
            },
            subtitle: {
              text:
                document.ontouchstart === undefined
                  ? 'Click and drag in the plot area to zoom in'
                  : 'Pinch the chart to zoom in',
              align: 'left'
            },
            xAxis: {
              categories: [],
              accessibility: {
                description: 'Months of the year'
              }
            },
            yAxis: {
              title: {
                text: 'Pressure'
              },
              labels: {
                format: '{value} hpa'
              }
            },
            series: [
              {
                name: this.$store.state.city,
                marker: {
                  symbol: 'circle'
                },
                data: []
              }
            ],
            tooltip: {
              crosshairs: true,
              shared: true
            },
            plotOptions: {
              spline: {
                marker: {
                  radius: 4,
                  lineColor: '#000000',
                  lineWidth: 1
                }
              },

              line: {
                dataLabels: {
                  enabled: true
                },
                enableMouseTracking: false,
                color: '#999999'
              }
            }
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'GET_CITY_BY_IP',
      'GET_CITY_WEATHER_NOW_FROM_API',
      'GET_CITY_WEATHER_5D_FROM_API'
    ]),
    changeTab(index) {
      this.activeTab = index
    },
    setHours(hours) {
      this.hoursFilter = hours
      for (let i = 0; i < 3; i++) {
        this.tabs[i].content.series[0].data.length = 0
        this.tabs[i].content.xAxis.categories.length = 0
      }
      for (let i = 0; i < this.hoursFilter; i++) {
        this.tabs[0].content.series[0].data.push(this.weather5dList[i].main.temp)
        this.tabs[1].content.series[0].data.push(this.weather5dList[i].wind.speed)
        this.tabs[2].content.series[0].data.push(this.weather5dList[i].main.pressure)
        this.tabs[0].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
        this.tabs[1].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
        this.tabs[2].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
      }
    }
  },
  computed: {
    ...mapGetters(['CITY', 'CITY_WEATHER_NOW', 'CITY_WEATHER_5D'])
  },
  mounted() {
    this.$store.watch(
      (state) => {
        this.GET_CITY_WEATHER_NOW_FROM_API().then(() =>
          this.GET_CITY_WEATHER_5D_FROM_API().then((response) => {
            if (response !== undefined) {
              this.weather5dList = response.data.list
              for (let i = 0; i < this.hoursFilter; i++) {
                this.tabs[0].content.series[0].data.push(this.weather5dList[i].main.temp)
                this.tabs[1].content.series[0].data.push(this.weather5dList[i].wind.speed)
                this.tabs[2].content.series[0].data.push(this.weather5dList[i].main.pressure)
                this.tabs[0].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
                this.tabs[1].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
                this.tabs[2].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
              }
            }
          })
        )
        return this.$store.getters.CITY
      },
      {
        deep: true
      }
    )

    this.GET_CITY_BY_IP()
      .then(() => this.GET_CITY_WEATHER_NOW_FROM_API())
      .then(() =>
        this.GET_CITY_WEATHER_5D_FROM_API().then((response) => {
          if (response !== undefined) {
              this.weather5dList = response.data.list
              for (let i = 0; i < this.hoursFilter; i++) {
                this.tabs[0].content.series[0].data.push(this.weather5dList[i].main.temp)
                this.tabs[1].content.series[0].data.push(this.weather5dList[i].wind.speed)
                this.tabs[2].content.series[0].data.push(this.weather5dList[i].main.pressure)
                this.tabs[0].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
                this.tabs[1].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
                this.tabs[2].content.xAxis.categories.push(this.weather5dList[i].dt_txt)
              }
            }
        })
      )
  }
}
</script>
<style scoped>
.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tab-content > .data-v-7118e138 {
  display: none;
}

.tab-content > .data-v-7118e138.show {
  display: block;
}

.weather__container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.weather__info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}
.weather__date {
  font-size: 12px;
}
.weather__forecast {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.weather__forecast-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.weather__forecast-top span {
  font-size: 48px;
  line-height: 1.2;
  font-weight: 400;
  display: flex;
  align-items: flex-start;
}

.weather__forecast-top span span {
  color: #9aa0a6;
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  padding-left: 9px;
  padding-top: 6px;
}
.weather__forecast-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
}

.weather__forecast-bottom span {
  color: #9aa0a6;
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  padding-left: 9px;
}

.weather__additional {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  max-width: 250px;
  text-align: right;
}

.wether__chart {
  width: 100%;
}

.tabs {
  display: flex;
  margin-bottom: 10px;
}

.tab {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.tab.active {
  background-color: #f1f1f1;
}

.tab-content {
  border-top: none;
  border-radius: 20px;
  overflow: hidden;
}

.highcharts-credits {
  display: none !important;
}

.weather__filter {
  display: flex;
  gap: 10px;
}
.weather__days {
  display: flex;
  gap: 10px;
}
.button {
  border-bottom: 3px solid transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid transparent;
  cursor: default;

  font-size: 14px;
  line-height: 1.58;
  color: #bdc1c6;
  display: inline-block;
  outline: 0;
  background: transparent;
  transition: 0.3s ease-in-out;
}

button:hover {
  border-radius: 10px;
  border-bottom: 3px solid #f1f1f1;
}

.highcharts-background {
  background: rgba(0, 0, 0, 0.5);
}
@media (max-width: 920px) {
  .weather-forecast-icon {
    width: 150px;
    height: 150px;
  }
}
@media (max-width: 768px) {
  .weather__info {
    flex-direction: column-reverse;
    justify-content: center;
  }
  .weather__forecast {
    flex-direction: row;
    align-items: center;
    gap: 20px;
    justify-content: center;
  }

  .weather__forecast-top {
    align-items: flex-start;
  }

  .weather__additional {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    width: 100%;
    max-width: none;
  }
  .weather__additional h1 {
    grid-area: 2 / 1 / 3 / 3;
    font-size: 48px;
    justify-self: center;
  }
  .weather__short {
    display: none !important;
  }

  .weather__date {
    grid-area: 1 / 1 / 2 / 3;
  }

  .tab-buttons {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0;
  }

  .weather__days {
    align-self: end;
  }
}

@media (max-width: 640px) {
}

@media (max-width: 480px) {
  h1 {
    font-size: 36px;
    text-align: center;
  }
  .weather__forecast {
    gap: 10px;
  }
  .weather__forecast-top span {
    font-size: 32px;
  }
  .weather-forecast-icon {
    width: 120px;
    height: 120px;
  }
}
</style>


