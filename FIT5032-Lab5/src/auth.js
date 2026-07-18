import { ref } from 'vue'

export const isAuthenticated = ref(
  localStorage.getItem('isAuthenticated') === 'true'
)

export const login = (username, password) => {
  const validUsername = 'admin'
  const validPassword = 'Library@123'

  if (username === validUsername && password === validPassword) {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    return true
  }

  return false
}

export const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
}