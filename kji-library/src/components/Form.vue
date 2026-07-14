<template>
  <div class="container mt-5">
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
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
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
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
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
                type="radio"
                class="form-check-input"
                id="residentYes"
                :value="true"
                v-model="formData.isAustralian"
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
                type="radio"
                class="form-check-input"
                id="residentNo"
                :value="false"
                v-model="formData.isAustralian"
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
              class="form-select"
              id="gender"
              v-model="formData.gender"
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
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
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

        <!-- Submitted user cards -->
        <div
          class="row mt-5"
          v-if="submittedCards.length"
        >
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2 w-100"
            >
              <div class="card-header">
                User Information
              </div>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  Username: {{ card.username }}
                </li>

                <li class="list-group-item">
                  Password: {{ card.password }}
                </li>

                <li class="list-group-item">
                  Australian Resident:
                  {{ card.isAustralian === true ? 'Yes' : 'No' }}
                </li>

                <li class="list-group-item">
                  Gender: {{ card.gender }}
                </li>

                <li class="list-group-item">
                  Reason: {{ card.reason }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>