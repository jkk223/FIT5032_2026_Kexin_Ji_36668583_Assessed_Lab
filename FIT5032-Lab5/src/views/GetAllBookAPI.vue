<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getAllBooks = (authorData) => {
  return authorData.flatMap((author) =>
    author.famousWorks.map((book) => ({
      authorId: author.id,
      authorName: author.name,
      title: book.title,
      year: book.year
    }))
  )
}

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('src/assets/json/authors.json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    authors.value = data

    const allBooks = getAllBooks(authors.value)

    apiResponse.value = {
      success: true,
      data: {
        totalBooks: allBooks.length,
        books: allBooks
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)

    apiResponse.value = {
      success: false,
      error: error.value,
      timestamp: new Date().toISOString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>
