<script setup>
defineProps({
  complaints: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="8">
      <h3 class="text-h5 mb-4">Denúncias Existentes</h3>
      <div v-if="complaints.length === 0" class="text-center">
        <p>Nenhuma denúncia encontrada.</p>
      </div>
      <div v-else>
        <v-card v-for="complaint in complaints" :key="complaint.id" class="mb-3 pa-3">
          <v-card-title>Cidade: {{ complaint.city }}</v-card-title>
          <v-card-text>
            <p><strong>Categoria:</strong> {{ complaint.category }}</p>
            <p><strong>Descrição:</strong> {{ complaint.description }}</p>
            <p><strong>Data:</strong> {{ new Date(complaint.timestamp.seconds * 1000).toLocaleString() }}</p>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
b {
  color: #2196F3;
}
</style>
