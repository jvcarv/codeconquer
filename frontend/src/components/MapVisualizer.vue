<script setup>
import { ref, computed, onMounted } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

const props = defineProps({
  complaints: Array,
  showCurrentLocation: {
    type: Boolean,
    default: false
  },
  allowClickToAddMarker: {
    type: Boolean,
    default: false
  }
})

const center = ref([-27.6305, -52.2364]) // São Paulo coordinates
const zoom = ref(10)
const currentLocation = ref(null)

// Drag detection variables
const isDragging = ref(false)
const mouseDownPos = ref(null)
const mouseDownTime = ref(null)
const DRAG_THRESHOLD = 5 // pixels
const CLICK_TIME_THRESHOLD = 300 // milliseconds

const filteredComplaints = computed(() => {
  return props.complaints.filter(complaint => complaint.location)
})

const getIcon = (category) => {
  let color = 'blue'
  if (category === 'Infraestrutura') color = 'red'
  else if (category === 'Saúde') color = 'green'
  else if (category === 'Segurança') color = 'orange'
  else if (category === 'Meio Ambiente') color = 'purple'

  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        // Center map on current location
        center.value = [position.coords.latitude, position.coords.longitude]
      },
      (error) => {
        console.error('Error getting current location:', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

onMounted(() => {
  if (props.showCurrentLocation) {
    getCurrentLocation()
  }
})

const selectedLocation = ref(null)

const onMouseDown = (event) => {
  if (!props.allowClickToAddMarker) return

  isDragging.value = false
  mouseDownPos.value = { x: event.originalEvent.clientX, y: event.originalEvent.clientY }
  mouseDownTime.value = Date.now()
}

const onMouseMove = (event) => {
  if (!props.allowClickToAddMarker || !mouseDownPos.value) return

  const currentPos = { x: event.originalEvent.clientX, y: event.originalEvent.clientY }
  const distance = Math.sqrt(
    Math.pow(currentPos.x - mouseDownPos.value.x, 2) +
    Math.pow(currentPos.y - mouseDownPos.value.y, 2)
  )

  if (distance > DRAG_THRESHOLD) {
    isDragging.value = true
  }
}

const onMouseUp = (event) => {
  if (!props.allowClickToAddMarker) return

  const timeDiff = Date.now() - mouseDownTime.value

  if (!isDragging.value && timeDiff < CLICK_TIME_THRESHOLD) {
    // This is a click, not a drag
    selectedLocation.value = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    }
  }

  // Reset drag state
  mouseDownPos.value = null
  mouseDownTime.value = null
  isDragging.value = false
}

const onMapClick = (event) => {
  // This is now handled by mouse events above
  // Keeping for backward compatibility if needed
}
</script>

<template>
  <div class="map-container">
    <l-map
      v-model:zoom="zoom"
      :center="center"
      style="height: 400px; width: 100%"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="complaint in filteredComplaints"
        :key="complaint.id"
        :lat-lng="[complaint.location.lat, complaint.location.lng]"
        :icon="getIcon(complaint.category)"
      >
        <l-popup>
          <div>
            <strong>{{ complaint.category }}</strong><br>
            {{ complaint.description }}<br>
            <small>{{ complaint.city }} - {{ new Date(complaint.timestamp.toDate ? complaint.timestamp.toDate() : complaint.timestamp).toLocaleDateString() }}</small>
          </div>
        </l-popup>
      </l-marker>
      <l-marker
        v-if="currentLocation"
        :lat-lng="[currentLocation.lat, currentLocation.lng]"
        :icon="L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })"
      >
        <l-popup>
          <div>
            <strong>Sua localização atual</strong>
          </div>
        </l-popup>
      </l-marker>
      <l-marker
        v-if="selectedLocation && allowClickToAddMarker"
        :lat-lng="[selectedLocation.lat, selectedLocation.lng]"
        :icon="L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })"
      >
        <l-popup>
          <div>
            <strong>Local selecionado</strong><br>
            Lat: {{ selectedLocation.lat.toFixed(6) }}<br>
            Lng: {{ selectedLocation.lng.toFixed(6) }}
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<style scoped>
.map-container {
  /* margin: 20px 40px; */
  border-radius: 10px;
  overflow: hidden;
  border: solid 1px #e5e7eb;
}
</style>