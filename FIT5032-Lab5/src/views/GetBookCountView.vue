<template>
  <section class="book-counter-page">
    <div class="hero-card">
      <div>
        <p class="eyebrow">EFOLIO TASK 9.1 · ALIBABA CLOUD</p>
        <h1>Book Counter</h1>
        <p class="lead">
          Count the books in JSON data by calling a Node.js cloud function
          deployed in Alibaba Cloud Function Compute.
        </p>
      </div>

      <div class="cloud-badge" aria-label="Cloud function status">
        <span class="status-dot"></span>
        China East 1 · Hangzhou
      </div>
    </div>

    <div class="counter-card">
      <div class="counter-copy">
        <p class="counter-label">Cloud function result</p>
        <p v-if="count !== null" class="counter-value">{{ count }}</p>
        <p v-else class="counter-placeholder">—</p>
        <p class="counter-caption">
          {{ message || 'Select the button to request the current JSON book count.' }}
        </p>
      </div>

      <button
        type="button"
        class="btn btn-primary action-button"
        :disabled="loading"
        @click="getBookCount"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {{ loading ? 'Contacting cloud function…' : 'Get Book Count' }}
      </button>
    </div>

    <div v-if="error" class="alert alert-danger mt-4" role="alert">
      <strong>Unable to retrieve the book count.</strong>
      <span class="d-block mt-1">{{ error }}</span>
    </div>

    <div class="evidence-grid">
      <article>
        <span class="evidence-number">01</span>
        <div>
          <h2>Live HTTPS request</h2>
          <p>The browser calls the deployed Function Compute endpoint with Axios.</p>
        </div>
      </article>
      <article>
        <span class="evidence-number">02</span>
        <div>
          <h2>JSON processed in cloud</h2>
          <p>The Node.js function calculates the length of its JSON books array.</p>
        </div>
      </article>
      <article>
        <span class="evidence-number">03</span>
        <div>
          <h2>Result shown in Vue</h2>
          <p>The returned <code>count</code> value is displayed above for assessment evidence.</p>
        </div>
      </article>
    </div>

    <p class="endpoint-note">
      API endpoint: <code>{{ countBooksApiUrl }}</code>
    </p>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const countBooksApiUrl =
  import.meta.env.VITE_COUNT_BOOKS_API ||
  'https://countbooks-gtkhftqfhf.cn-hangzhou.fcapp.run'

const count = ref(null)
const message = ref('')
const loading = ref(false)
const error = ref('')

const parseResponseData = (data) => {
  if (typeof data !== 'string') {
    return data
  }

  try {
    return JSON.parse(data)
  } catch {
    return { message: data }
  }
}

const getBookCount = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(countBooksApiUrl, {
      headers: {
        Accept: 'application/json'
      },
      timeout: 15000
    })

    const responseData = parseResponseData(response.data)
    const numericCount = Number(responseData?.count)

    if (!Number.isFinite(numericCount)) {
      throw new Error('The cloud function response did not include a valid count.')
    }

    count.value = numericCount
    message.value =
      responseData?.message || `There are ${numericCount} books in the JSON data.`
  } catch (requestError) {
    console.error('Error fetching the book count:', requestError)
    count.value = null
    message.value = ''
    const responseData = parseResponseData(requestError.response?.data)
    error.value =
      responseData?.message ||
      responseData?.Message ||
      requestError.message ||
      'An unexpected network error occurred.'
  } finally {
    loading.value = false
  }
}

onMounted(getBookCount)
</script>

<style scoped>
.book-counter-page {
  --ink: #102a43;
  --muted: #627d98;
  --blue: #1261a0;
  --cyan: #1fb6b2;
  max-width: 980px;
  margin: 0 auto;
  color: var(--ink);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  padding: 2.5rem;
  border-radius: 24px;
  color: white;
  background:
    radial-gradient(circle at 82% 20%, rgba(64, 224, 208, 0.35), transparent 28%),
    linear-gradient(135deg, #0b2545, #1261a0);
  box-shadow: 0 20px 45px rgba(16, 42, 67, 0.18);
}

.eyebrow,
.counter-label {
  margin: 0 0 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2.35rem, 5vw, 4.25rem);
  font-weight: 750;
  letter-spacing: -0.045em;
}

.lead {
  max-width: 640px;
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.8);
}

.cloud-badge {
  flex: none;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.82rem;
}

.status-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #5ee6a8;
  box-shadow: 0 0 0 5px rgba(94, 230, 168, 0.14);
}

.counter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: -1.5rem 2rem 0;
  padding: 2rem 2.25rem;
  position: relative;
  border: 1px solid #d9e2ec;
  border-radius: 20px;
  background: white;
  box-shadow: 0 18px 38px rgba(16, 42, 67, 0.12);
}

.counter-label {
  color: var(--blue);
}

.counter-value,
.counter-placeholder {
  margin: 0;
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--blue);
}

.counter-placeholder {
  color: #bcccdc;
}

.counter-caption {
  margin: 0.6rem 0 0;
  color: var(--muted);
}

.action-button {
  min-width: 190px;
  padding: 0.85rem 1.25rem;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--blue), #1786c7);
  font-weight: 650;
  box-shadow: 0 10px 24px rgba(18, 97, 160, 0.22);
}

.evidence-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.evidence-grid article {
  display: flex;
  gap: 0.9rem;
  padding: 1.25rem;
  border: 1px solid #e6edf3;
  border-radius: 16px;
  background: #f8fbfd;
}

.evidence-number {
  color: var(--cyan);
  font-size: 0.75rem;
  font-weight: 800;
}

.evidence-grid h2 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  font-weight: 700;
}

.evidence-grid p,
.endpoint-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.87rem;
}

.endpoint-note {
  margin-top: 1.25rem;
  overflow-wrap: anywhere;
}

@media (max-width: 768px) {
  .hero-card,
  .counter-card {
    flex-direction: column;
  }

  .counter-card {
    margin-inline: 0.75rem;
  }

  .action-button {
    width: 100%;
  }

  .evidence-grid {
    grid-template-columns: 1fr;
  }
}
</style>
