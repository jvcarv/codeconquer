<script setup>
defineProps({
  text: {
    type: String,
    default: 'Button'
  },
  color: {
    type: String,
    default: 'blue'
  },
  icon: {
    type: String,
    default: 'mdi-plus'
  }
})
</script>

<template>
    <v-btn
      rounded="lg"
      size="x-large"
      :color="color"
      class="pt-10 pb-10 ps-3 pe-3 mb-5"
      :prepend-icon="icon"
      block
      >{{text}}</v-btn
    >
</template>
