<script setup>
import { ref } from 'vue'
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '../firebase.js'

import HeaderHome from './HeaderHome.vue'
import ComplaintCard from './ComplaintCard.vue'
import MapVisualizer from './MapVisualizer.vue'

const complaintsRef = collection(db, 'complaints')
const complaints = useCollection(complaintsRef)
const showComplaints = ref(false)
const complaintsView = ref(true);

function toggleComplaintsView() {
  showComplaints.value = !showComplaints.value
}
</script>

<template>
  <HeaderHome></HeaderHome>

  <v-btn v-show="!showComplaints" variant="plain" class="btn--view_existing" @click="toggleComplaintsView">Ver Denúncias Existentes</v-btn>
  <v-btn v-show="showComplaints" variant="plain" class="btn--view_existing" @click="toggleComplaintsView">Esconder Denúncias</v-btn>
  
  <div class="complaints__box" v-show="showComplaints">
    <v-btn-toggle mandatory class="complaints__toggle">
      <v-btn :class="complaintsView ? 'v-btn--active' : ''" @click="complaintsView = true">Ver no mapa</v-btn>
      <v-btn @click="complaintsView = false">Ver lista</v-btn>
    </v-btn-toggle>
    
    <MapVisualizer v-show="complaintsView" :complaints="complaints" :show-current-location="true" :allow-click-to-add-marker="false"/>

    <ComplaintCard v-show="!complaintsView" v-for="item of complaints" v-model:category="item.category" v-model:description="item.description" v-model:city="item.city" v-model:timestamp="item.timestamp"></ComplaintCard>
  </div>

  <section class="note">
    <h2 class="note__title">Ajude-nos a melhorar a cidade!</h2>

    <p class="note__description">
      Suas denúncias anônimas nos ajudam a identificar e resolver problemas em nossa comunidade.
      Cada denúncia é importante e contribui para tornar nossa cidade melhor para todos.
    </p>
  </section>
</template>

<style scoped>
.btn--view_existing {
  display: flex;

  width: 240px;
  margin: 32px auto;

  background-color: #458ce9;
  color: #fff;
  border-radius: 10px;
  padding: 8px 16px;

  font-family: 'Noto Sans', Arial, sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;

  letter-spacing: normal;
}

.note {
  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: center;
  justify-content: center;

  padding: 32px;
  border-radius: 10px;
  border: solid 1px #e5e7eb;

  margin: auto 20px 20px;
}

.note__title {
  color: #344256;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.note__description {
  color: #9aa4b1;
  font-size: 14px;
  text-align: center;
}

button.v-btn.btn--main {
  background-color: #3182ed;
  color: #fff;
  border-radius: 10px;
  padding: 8px 16px;

  font-family: 'Noto Sans', Arial, sans-serif;
  font-weight: 500 !important;
  font-size: 14px;
  text-transform: capitalize;

  letter-spacing: normal;
}

.complaints__box {
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 32px;
}

.complaints__toggle {
  width: 100%;
  display: flex;
}

.complaints__toggle .v-btn {
  width: 50%;
  height: 32px !important;
  letter-spacing: normal;

  font-family: 'Noto Sans', Arial, sans-serif;
  color: #344256;
  text-transform: capitalize;
  font-weight: 600;
}
</style>
