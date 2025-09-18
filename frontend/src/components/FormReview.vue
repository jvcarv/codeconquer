<script setup>
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

const props = defineProps(['city', 'category', 'description'])

const complaintsRef = collection(db, 'complaints')

async function submit() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    })

    const { latitude, longitude } = position.coords

    await addDoc(complaintsRef, {
      city: props.city,
      category: props.category,
      description: props.description,
      timestamp: new Date(),
      location: {
        lat: latitude,
        lng: longitude
      }
    })
    alert('Denúncia enviada com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar denúncia:', error)
    if (error.code === error.PERMISSION_DENIED) {
      alert('Permissão de localização negada. Denúncia enviada sem localização.')
      try {
        await addDoc(complaintsRef, {
          city: props.city,
          category: props.category,
          description: props.description,
          timestamp: new Date()
        })
        alert('Denúncia enviada com sucesso!')
      } catch (innerError) {
        console.error('Erro ao enviar denúncia sem localização:', innerError)
        alert('Erro ao enviar denúncia. Tente novamente.')
      }
    } else {
      alert('Erro ao obter localização. Tente novamente.')
    }
  }
}
</script>

<template>
    <v-icon class="step__icon" :icon="'mdi-file-document'" color="#3182ed"></v-icon>
    <h2 class="step__title">Revise a denúncia</h2>

    <p class="step__description">
        Revise todas as informações antes de enviar sua denúncia anônima.
    </p>

    <div class="review__card">
        <div class="review__top">
            <v-icon class="review__icon" :icon="'mdi-map-marker'"></v-icon>
            <span class="review__title">Cidade</span>
        </div>
        <p class="review__value">{{ city }}</p>
    </div>
    <div class="review__card">
        <div class="review__top">
            <v-icon class="review__icon" :icon="'mdi-tag'"></v-icon>
            <span class="review__title">Categoria</span>
        </div>
        <p class="review__value">{{ category }}</p>
    </div>
    <div class="review__card">
        <div class="review__top">
            <v-icon class="review__icon" :icon="'mdi-file-document'"></v-icon>
            <span class="review__title">Descrição</span>
        </div>
        <p class="review__value">{{ description }}</p>
    </div>

    <v-btn @click="submit" append-icon="mdi-send" class="btn--submit">Enviar Denúncia</v-btn>
</template>

<style scoped>
    .review__card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px;
        border-radius: 10px;
        border: solid 1px #e5e7eb;
        width: 100%;
    }

    .review__top {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .review__icon {
        color: #3182ed;
        font-size: 16px;

        background-color: #f5f9ff;
        height: 24px;
        width: 24px;
        border-radius: 50%;
    }

    .review__title {
        color: #344256;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
    }

    .review__value {
        color: #9aa4b1;
        font-size: 16px;
        text-align: flex-start;
        font-weight: 500;
    }

    .btn--submit {
        background-color: #3182ed;
        color: #fff !important;
        border-radius: 10px;
        padding: 8px 16px;
        font-family: 'Noto Sans', Arial, sans-serif;
        font-weight: 500 !important;
        font-size: 14px;
        text-transform: capitalize;
        letter-spacing: normal;
        margin-top: 20px;
    }
</style>