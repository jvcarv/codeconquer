<script setup>
const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateCity(event) {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <h2 class="step__title">Informar local</h2>

    <p class="step__description">
        Ajude-nos a localizar o problema fornecendo o endereço ou usando sua localização atual.
    </p>

    <v-text-field @input="updateCity" label="Cidade" style="width: 100%;" bg-color="#f5f9ff" />
</template>
