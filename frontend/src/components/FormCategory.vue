<script setup>
const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateCategory(value) {
    emit('update:modelValue', value)
}
</script>

<template>
    <v-icon class="step__icon" :icon="'mdi-tag'" color="#3182ed"></v-icon>
    <h2 class="step__title">Escolher categoria</h2>

    <p class="step__description">
        Selecione a categoria que melhor descreve sua reclamação. Isso nos ajudará a encaminhá-la ao departamento certo.
    </p>

    <v-select
        label="Categoria"
        :items="['Burraco na estrada', 'Fios de luz soltos', 'Lixo não recolhido', 'Água parada', 'Animais soltos', 'Calçada quebrada']"
        @update:modelValue="updateCategory"
        style="width: 100%;"
        bg-color="#f5f9ff"
        ></v-select>
</template>
