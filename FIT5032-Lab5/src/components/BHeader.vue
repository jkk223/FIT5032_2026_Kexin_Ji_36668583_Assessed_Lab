<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/addbook"
            class="nav-link"
            active-class="active"
          >
            Add Book
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/FireRegister"
            class="nav-link"
            active-class="active"
          >
            FireRegister
          </RouterLink>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </router-link>
        </li>

        <li v-else class="nav-item">
          <button
            type="button"
            class="nav-link btn btn-link"
            @click="handleLogout"
          >
            Logout
          </button>
        </li>
        <li class="nav-item">
          <router-link
            to="/WeatherCheck"
            class="nav-link"
            active-class="active"
          >
            Get Weather
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/CountBookAPI"
            class="nav-link"
            active-class="active"
          >
            Count Book API
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/GetAllBookAPI"
            class="nav-link"
            active-class="active"
          >
            Get All Book API
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/get-book-count"
            class="nav-link lab-nine-link"
            active-class="active"
          >
            Lab 9 Book Counter
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.nav-link {
  cursor: pointer;
}

.nav-pills {
  justify-content: center;
  gap: 0.2rem;
}

.lab-nine-link {
  color: #0f766e;
  font-weight: 650;
}
</style>
