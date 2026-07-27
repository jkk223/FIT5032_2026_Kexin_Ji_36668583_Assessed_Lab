<template>
  <h1>Create an Account</h1>

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
    <button @click="register">
      Save to Firebase
    </button>
  </p>
</template>

<script setup>
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '@/Firebase/init'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      console.log('Firebase Register Successful!')
      console.log(userCredential.user)

      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
