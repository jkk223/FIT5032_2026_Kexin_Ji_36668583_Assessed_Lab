<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <BHeader />

  <main class="container py-4">
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  min-height: 100vh;
}

main {
  max-width: 1100px;
  margin: 0 auto;
}
</style>