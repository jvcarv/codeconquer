<script setup>
import { ref, reactive } from 'vue';
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import { useRouter } from 'vue-router';

import HeaderForm from '../components/HeaderForm.vue'
import FormLocation from '../components/FormLocation.vue'
import FormCategory from '@/components/FormCategory.vue';
import FormDescription from '@/components/FormDescription.vue';
import FormReview from '@/components/FormReview.vue';

let step = ref(1);

let data = reactive({
    city: '',
    category: '',
    description: '',
    location: null // { lat, lng }
})

const router = useRouter();

const complaintsRef = collection(db, 'complaints')

async function submit() {
    if (Object.values(data).some(item => item == '' || item == null)) {
        triggerAlert('Formulário com dados não preenchidos. Não foi possível criar a denúncia.', 'error');
        return;
    }

    try {
        const locationString = data.location ? `${data.location.lat},${data.location.lng}` : '';
        await addDoc(complaintsRef, {
            city: data.city,
            category: data.category,
            description: data.description,
            localizacao: locationString,
            timestamp: new Date()
        })
        triggerAlert('Denúncia enviada com sucesso!', 'success')
    } catch (error) {
        console.error('Erro ao enviar denúncia:', error)
        triggerAlert('Erro ao enviar denúncia. Tente novamente.', 'error')
    }
}

const showAlert = ref(false)
const alertMessage = ref('')
const alertBackgroundColor = ref('#00FF00')
const alertIcon = ref('mdi-check-circle')
const alertColorClass = ref('alert--green');

function triggerAlert(message, type) {
  alertMessage.value = message
  console.log(type)

  switch (type) {
    case 'success':
      alertBackgroundColor.value = '#dcffd8'
      alertIcon.value = 'mdi-check-circle'
      alertColorClass.value = 'alert--green'
      break
    case 'error':
      alertBackgroundColor.value = '#ffd4d2'
      alertIcon.value = 'mdi-alert-circle'
      alertColorClass.value = 'alert--red'
      break
  }

  showAlert.value = true

  setTimeout(() => {
    showAlert.value = false

    if (type == 'success') {
        router.push('/');
    }
  }, 3000)
}
</script>

<template>
    <HeaderForm v-model:step="step"></HeaderForm>

    <section class="step__container">
        <FormLocation v-if="step == 1" v-model="data.city" v-model:location="data.location"></FormLocation>
        <FormCategory v-if="step == 2" v-model="data.category"></FormCategory>
        <FormDescription v-if="step == 3" v-model="data.description"></FormDescription>
        <FormReview v-if="step == 4" v-model:city="data.city" v-model:category="data.category"
            v-model:description="data.description" :location="data.location"></FormReview>
    </section>
    <div class="step__button_box">
        <v-btn v-if="step > 1" prepend-icon="mdi-arrow-left" class="btn--previous" @click="step--">Voltar</v-btn>
        <v-btn v-if="step < 4" append-icon="mdi-arrow-right" class="btn--forward" @click="step++">Próximo</v-btn>
        <v-btn v-if="step == 4" @click="submit" append-icon="mdi-send" class="btn--forward">Enviar Denúncia</v-btn>
    </div>

    <v-snackbar
      v-model="showAlert"
      :color="alertBackgroundColor"
      location="top center"
      transition="slide-y-transition"
      :timeout="3000"
      elevation="8"
    >
      <template #default style="border-radius: 8px">
        <div :class="alertColorClass">
            <v-icon class="me-2">{{ alertIcon }}</v-icon>
            {{ alertMessage }}
        </div>
      </template>
    </v-snackbar>
</template>

<style>
.step__container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    align-items: center;
    justify-content: center;

    padding: 32px;
    border-radius: 10px;
    border: solid 1px #e5e7eb;

    margin: 20px;
}


.step__icon {
    background-color: #f5f9ff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
}

.step_icon::before {
    font-size: 30px;
}

.step__title {
    color: #344256;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
}

.step__description {
    color: #9aa4b1;
    font-size: 14px;
    text-align: center;
}

.step__button_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 0 20px;
}

.btn--forward {
    background-color: #3182ed;
    color: #fff !important;
    border-radius: 10px;
    padding: 8px 16px;

    font-family: 'Noto Sans', Arial, sans-serif;
    font-weight: 500 !important;
    font-size: 14px;
    text-transform: capitalize;

    letter-spacing: normal;

    margin-left: auto;
}

.btn--previous {
    background-color: #f5f9ff;
    color: #000;
    border-radius: 10px;
    padding: 8px 16px;

    font-family: 'Noto Sans', Arial, sans-serif;
    font-weight: 500 !important;
    font-size: 14px;
    text-transform: capitalize;

    letter-spacing: normal;
}

.alert--green {
    color: rgb(0, 95, 0) !important;
}
.alert--red {
    color: rgb(171, 0, 0) !important;
}
</style>