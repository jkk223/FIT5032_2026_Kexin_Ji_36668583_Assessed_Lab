<template>
  <h1>Sign In</h1>

  <p>
    <input
      type="text"
      placeholder="Email"
      v-model="email"
    />
  </p>

  <p>
    <input
      type="password"
      placeholder="Password"
      v-model="password"
    />
  </p>

  <p>
    <button @click="login">
      Sign In
    </button>
  </p>

  <p v-if="currentRole">
    Signed in as: {{ currentRole }}
  </p>
</template>


<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const currentRole = ref('')

const userRoles = {
  'kjii0006@student.monash.edu': 'user',
  'admin.lab7.kexinji@example.com': 'admin'
}

const auth = getAuth()

const login = () => {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    // .then((userCredential) => {
    //   console.log('Firebase Login Successful!')
    //   console.log(userCredential.user)
    // })
    .then((userCredential) => {
        const currentUser = userCredential.user
        const userEmail = currentUser.email

        currentRole.value = userRoles[userEmail] || 'user'

        console.log('Firebase Login Successful!')
        console.log('Current user:', currentUser)
        console.log('Current role:', currentRole.value)
        })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>