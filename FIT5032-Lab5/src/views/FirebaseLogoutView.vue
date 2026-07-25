<template>
  <main>
    <h1>Firebase Logout</h1>

    <p v-if="currentUser">
      Current user: {{ currentUser.email }}
    </p>

    <p v-else>
      Current user: null
    </p>

    <button @click="logoutUser">
      Log Out
    </button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const auth = getAuth()
const currentUser = ref(null)

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  console.log('Current user:', user)
})

const logoutUser = () => {
  signOut(auth)
    .then(() => {
      currentUser.value = auth.currentUser

      console.log('Firebase Logout Successful!')
      console.log('Current user:', auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>