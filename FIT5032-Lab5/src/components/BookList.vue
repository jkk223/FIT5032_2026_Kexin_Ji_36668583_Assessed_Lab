<template>
  <div class="mt-5">
    <h2>First 3 Books with ISBN Greater than 1000</h2>

    <p v-if="loading">Loading books...</p>

    <table v-else-if="books.length > 0" class="table table-striped mt-3">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Book Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.isbn }}</td>
          <td>{{ book.name }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm me-2"
              @click="updateBook(book)"
            >
              Update
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteBook(book)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No books found.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../Firebase/init'

const books = ref([])
const loading = ref(true)

const getBooks = async () => {
  loading.value = true

  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )

    const querySnapshot = await getDocs(booksQuery)

    books.value = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }))
  } catch (error) {
    console.error('Error retrieving books:', error)
  } finally {
    loading.value = false
  }
}

const updateBook = async (book) => {
  const updatedName = window.prompt(
    'Enter the new book name:',
    book.name
  )

  if (!updatedName || updatedName.trim() === '') {
    return
  }

  try {
    const bookReference = doc(db, 'books', book.id)

    await updateDoc(bookReference, {
      name: updatedName.trim()
    })

    await getBooks()
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

const deleteBook = async (book) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${book.name}"?`
  )

  if (!confirmed) {
    return
  }

  try {
    const bookReference = doc(db, 'books', book.id)

    await deleteDoc(bookReference)

    await getBooks()
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

onMounted(() => {
  getBooks()
})
</script>