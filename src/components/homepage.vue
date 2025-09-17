<script setup>
import { ref } from 'vue';
import NotificationsText from './notificationsText.vue';
import Button from './button.vue';

const resolvedQuantity = ref(5);
const realizedQuantity = ref(10);

</script>

<template>
  <v-container class="d-flex flex-column align-center pt-10">
    <Button text="Nova chamada" color="blue" icon="mdi-plus"/>

    <Button text="Minhas chamadas" color="grey" icon="mdi-archive"/>
  </v-container>

  <NotificationsText
    :realizedQuantity="realizedQuantity"
    :resolvedQuantity="resolvedQuantity"
  />

  <v-row>
    <v-col cols="12 d-flex" class="justify-center">
      <v-btn rounded="xl" size="x-large" color="red" class="pt-2 pb-2 ps-2 pe-2 mt-15">Sair</v-btn>
    </v-col>
  </v-row>
</template>

