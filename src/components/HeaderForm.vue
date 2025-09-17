<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const steps = ref(1);

function navigateToHome() {
    router.push('/');
}
</script>

<template>
    <section class="header">
        <div class="column--left">
            <v-btn icon variant="text" class="btn--back" @click="navigateToHome">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </div>
        <div class="column--right">
            <h1 class="header__title">Criar denúncia</h1>
            <p class="header__description">{{ 'Etapa ' + steps + '/5' }}</p>
        </div>
    </section>
</template>

<style scoped>
.header {
    display: flex;
    gap: 8px;

    padding: 24px 16px;
    align-items: center;
    justify-content: center;

    font-family: 'Noto Sans', Arial, sans-serif;

    border-bottom: solid 2px #e3e7ed;
}

.column--left,
.column--right {
    display: flex;
    align-items: center;
}

.column--right {
    gap: 4px;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.column--left {
    justify-content: flex-start;
}

.header__title {
    color: #344256;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
}

.header__description {
    color: #9aa4b1;
    font-size: 16px;
}

button.v-btn.btn--back {
    border-radius: 10px;
    padding: 8px;

    font-family: 'Noto Sans', Arial, sans-serif;
    font-weight: 500 !important;
    font-size: 14px;
    text-transform: capitalize;

    letter-spacing: normal;
}

button.v-btn.btn--back svg path {
    fill: #3182ed;
}
</style>