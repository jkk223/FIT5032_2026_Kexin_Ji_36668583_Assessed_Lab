<template>
  <div class="container mt-5">
    <!-- User information form -->
    <div class="row">
      <div
        class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3"
      >
        <h1 class="text-center mb-4">
          User Information Form / Credentials
        </h1>

        <form @submit.prevent="submitForm">
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">
              Username:
            </label>

            <input
              id="username"
              v-model="formData.username"
              type="text"
              class="form-control"
              @blur="validateName(true)"
              @input="validateName(false)"
            />

            <div
              v-if="errors.username"
              class="text-danger mt-1"
            >
              {{ errors.username }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">
              Password:
            </label>

            <input
              id="password"
              v-model="formData.password"
              type="password"
              class="form-control"
              @blur="validatePassword(true)"
              @input="validatePassword(false)"
            />

            <div
              v-if="errors.password"
              class="text-danger mt-1"
            >
              {{ errors.password }}
            </div>
          </div>

          <!-- Australian Resident -->
          <div class="mb-3">
            <label class="form-label d-block">
              Australian Resident?
            </label>

            <div class="form-check form-check-inline">
              <input
                id="residentYes"
                v-model="formData.isAustralian"
                type="radio"
                class="form-check-input"
                :value="true"
                @change="validateResident"
              />

              <label
                for="residentYes"
                class="form-check-label"
              >
                Yes
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                id="residentNo"
                v-model="formData.isAustralian"
                type="radio"
                class="form-check-input"
                :value="false"
                @change="validateResident"
              />

              <label
                for="residentNo"
                class="form-check-label"
              >
                No
              </label>
            </div>

            <div
              v-if="errors.isAustralian"
              class="text-danger mt-1"
            >
              {{ errors.isAustralian }}
            </div>
          </div>

          <!-- Gender -->
          <div class="mb-3">
            <label for="gender" class="form-label">
              Gender:
            </label>

            <select
              id="gender"
              v-model="formData.gender"
              class="form-select"
              @change="validateGender"
            >
              <option disabled value="">
                Please select one
              </option>

              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>

            <div
              v-if="errors.gender"
              class="text-danger mt-1"
            >
              {{ errors.gender }}
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining:
            </label>

            <textarea
              id="reason"
              v-model="formData.reason"
              class="form-control"
              rows="3"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="text-danger mt-1"
            >
              {{ errors.reason }}
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary me-2"
          >
            Submit
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            @click="clearForm"
          >
            Clear
          </button>
        </form>
      </div>
    </div>

    <!-- PrimeVue DataTable -->
    <div
      v-if="submittedCards.length"
      class="mt-5 mb-5"
    >
      <h2 class="text-center mb-3">
        Submitted User Information
      </h2>

      <DataTable
        :value="submittedCards"
        data-key="id"
        striped-rows
        show-gridlines
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        scrollable
        table-style="min-width: 60rem"
      >
        <Column
          field="username"
          header="Username"
          sortable
        />

        <Column
          field="password"
          header="Password"
        />

        <Column
          header="Australian Resident"
          sortable
        >
          <template #body="{ data }">
            {{ data.isAustralian === true ? 'Yes' : 'No' }}
          </template>
        </Column>

        <Column
          field="gender"
          header="Gender"
          sortable
        />

        <Column
          field="reason"
          header="Reason for Joining"
        />
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const initialFormData = {
  username: '',
  password: '',
  isAustralian: null,
  gender: '',
  reason: ''
}

const formData = ref({
  ...initialFormData
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  isAustralian: null,
  gender: null,
  reason: null
})

const validateName = (blur) => {
  const username = formData.value.username.trim()

  if (username.length < 3) {
    if (blur) {
      errors.value.username =
        'Name must be at least 3 characters'
    }
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar =
    /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasMinLength) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters long'
    }
  } else if (!hasUppercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one uppercase letter'
    }
  } else if (!hasLowercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one lowercase letter'
    }
  } else if (!hasNumber) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one number'
    }
  } else if (!hasSpecialChar) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one special character'
    }
  } else {
    errors.value.password = null
  }
}

const validateResident = () => {
  if (formData.value.isAustralian === null) {
    errors.value.isAustralian =
      'Please select whether you are an Australian resident'
  } else {
    errors.value.isAustralian = null
  }
}

const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender =
      'Please select a gender option'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason.trim()

  if (reason.length < 10) {
    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters'
    }
  } else if (reason.length > 200) {
    if (blur) {
      errors.value.reason =
        'Reason must not exceed 200 characters'
    }
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident()
  validateGender()
  validateReason(true)

  const hasErrors = Object.values(
    errors.value
  ).some((error) => error !== null)

  if (!hasErrors) {
    submittedCards.value.push({
      id: Date.now(),
      ...formData.value
    })
  }
}

const clearForm = () => {
  formData.value = {
    ...initialFormData
  }

  errors.value = {
    username: null,
    password: null,
    isAustralian: null,
    gender: null,
    reason: null
  }
}
</script>

<style scoped>
.text-danger {
  font-size: 0.9rem;
}
</style>