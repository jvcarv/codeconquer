<script setup>
defineProps({
  realizedQuantity: {
    type: Number,
    required: true
  },
  resolvedQuantity: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="8" class="text-center">
      <p class="text-h5 mt-10 mb-10 ps-5 pe-5">
        Já foram realizadas <b>{{ realizedQuantity }}</b> chamadas na sua região e
        <b>{{ resolvedQuantity }}</b> já foram resolvidas com sucesso!
      </p>
    </v-col>
  </v-row>
</template>

<style scoped>
b {
  color: #2196F3;
}
</style>
