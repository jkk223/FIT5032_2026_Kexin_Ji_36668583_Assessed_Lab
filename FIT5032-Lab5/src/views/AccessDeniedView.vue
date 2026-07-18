<template>
  <div class="row mt-4">
    <div class="col-md-8 offset-md-2">
      <div class="alert alert-danger text-center">
        <h1>Access Denied</h1>

        <p>
          The username or password you entered is incorrect.
        </p>

        <router-link to="/login" class="btn btn-primary">
          Return to Login
        </router-link>
      </div>
    </div>
  </div>
</template>