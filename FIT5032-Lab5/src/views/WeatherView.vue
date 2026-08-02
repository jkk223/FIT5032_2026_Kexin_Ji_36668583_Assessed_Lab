<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />

        <button
          type="button"
          @click="searchByCity"
          class="search-button"
        >
          Search
        </button>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>

        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '83d244812878f498f1774c88bbdb87d5'

export default {
  name: 'WeatherView',

  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },

  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null
    },

    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },

  mounted() {
    this.fetchCurrentLocationWeather()
  },

  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords

          const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?lat=${latitude}&lon=${longitude}&appid=${apikey}`

          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
        const cityName = this.city.trim()

        if (!cityName) {
            return
        }

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(cityName)}&appid=${apikey}`

        await this.fetchWeatherData(url)
    },

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
  }
}
</script>
