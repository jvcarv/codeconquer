<script setup>
const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateDescription(event) {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <v-icon class="step__icon" :icon="'mdi-file-document'" color="#3182ed"></v-icon>
    <h2 class="step__title">Adicione detalhes</h2>

    <p class="step__description">
        Forneça um título claro e uma descrição detalhada do problema. Quanto mais específico você for, melhor poderemos ajudar.
    </p>

    <v-text-field @input="updateDescription" label="Descrição" style="width: 100%;" bg-color="#f5f9ff" />
</template>