<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const route = useRoute()

const handleLogin = () => {
  const success = login(username.value, password.value)

  if (success) {
    errorMessage.value = ''

    const redirectPath =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/about'

    router.push(redirectPath)
  } else {
    router.push('/access-denied')
  }
}
</script>

<template>
  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card p-4">
        <h1 class="text-center mb-4">Member Login</h1>

        <div
          v-if="route.query.denied === 'true'"
          class="alert alert-warning"
        >
          You must log in before accessing the About page.
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="login-username" class="form-label">
              Username
            </label>

            <input
              id="login-username"
              v-model="username"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="login-password" class="form-label">
              Password
            </label>

            <input
              id="login-password"
              v-model="password"
              type="password"
              class="form-control"
              required
            />
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>