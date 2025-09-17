<script setup>
import HeaderForm from '../components/HeaderForm.vue'
import FormLocation from '../components/FormLocation.vue'
import { ref, reactive } from 'vue';
import FormCategory from '@/components/FormCategory.vue';
import FormDescription from '@/components/FormDescription.vue';
import FormReview from '@/components/FormReview.vue';

let step = ref(1);

let data = reactive({
    city: '',
    category: '',
    description: ''
})
</script>

<template>
    <HeaderForm v-model:step="step"></HeaderForm>

    <section class="step__container">
        <FormLocation v-if="step == 1" v-model="data.city"></FormLocation>
        <FormCategory v-if="step == 2" v-model="data.category"></FormCategory>
        <FormDescription v-if="step == 3" v-model="data.description"></FormDescription>
        <FormReview v-if="step == 4" v-model:city="data.city" v-model:category="data.category" v-model:description="data.description"></FormReview>
    </section>
    <div class="step__button_box">
        <v-btn v-if="step > 1" prepend-icon="mdi-arrow-left" class="btn--previous" @click="step--">Voltar</v-btn>
        <v-btn v-if="step < 4" append-icon="mdi-arrow-right" class="btn--forward" @click="step++">Próximo</v-btn>
        <v-btn v-if="step == 4" append-icon="mdi-send" class="btn--forward">Enviar</v-btn>
    </div>
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
</style>