<script setup>
import MapVisualizer from './MapVisualizer.vue'
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: String,
    location: Object // { lat, lng }
})

const emit = defineEmits(['update:modelValue', 'update:location'])

const selectedLocation = ref(null)

function updateCity(event) {
    emit('update:modelValue', event.target.value)
}

function onLocationSelected(location) {
    selectedLocation.value = location
    emit('update:location', location)
}

watch(() => props.location, (newLocation) => {
    selectedLocation.value = newLocation
})
</script>

<template>
    <v-icon class="step__icon" :icon="'mdi-map-marker'" color="#3182ed"></v-icon>
    <h2 class="step__title">Informar local</h2>

    <p class="step__description">
        Ajude-nos a localizar o problema fornecendo a cidade e selecionando o local exato no mapa.
    </p>

    <v-text-field @input="updateCity" label="Cidade" style="width: 100%;" bg-color="#f5f9ff" />

    <MapVisualizer
        :allowClickToAddMarker="true"
        :showCurrentLocation="true"
        :initialSelectedLocation="props.location"
        @location-selected="onLocationSelected"
    />

    <p v-if="selectedLocation" class="location-info">
        Local selecionado: Lat {{ selectedLocation.lat.toFixed(6) }}, Lng {{ selectedLocation.lng.toFixed(6) }}
    </p>
</template>
