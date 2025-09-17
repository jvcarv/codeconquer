<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
