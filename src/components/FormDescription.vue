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
    <v-icon class="v-icon" :icon="'mdi-file-document'" color="#3182ed"></v-icon>
    <h2 class="step__title">Adicione detalhes</h2>

    <p class="step__description">
        Forneça um título claro e uma descrição detalhada do problema. Quanto mais específico você for, melhor poderemos ajudar.
    </p>

    <v-text-field @input="updateDescription" label="Descrição" style="width: 100%;" bg-color="#f5f9ff" />
</template>

<style scoped>
    .v-icon {
        background-color: #f5f9ff;
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    .v-icon::before {
        font-size: 30px;
    }
</style>