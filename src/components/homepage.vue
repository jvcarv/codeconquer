<script setup>
import navbar from './navbar.vue'
</script>

<template>
  <v-btn
    rounded="lg"
    size="x-large"
    color="blue"
    class="pt-5 pb-5 ps-3 pe-3 mb-5 mt-10"
    prepend-icon="mdi-plus"
    block
    >Nova notificação</v-btn
  >

  <v-btn
    rounded="lg"
    size="x-large"
    color="grey"
    class="pt-5 pb-5 ps-3 pe-3 mt-3"
    prepend-icon="mdi-archive"
    block
    >Minhas notificações</v-btn
  >

  <p>Já foram feitas 0 notificações</p>

  <v-row>
    <v-col cols="12 d-flex" class="justify-center">
      <v-btn rounded="xl" size="x-large" color="red" class="pt-2 pb-2 ps-2 pe-2 mt-3">Sair</v-btn>
    </v-col>
  </v-row>
</template>
