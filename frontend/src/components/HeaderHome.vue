<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToForm() {
    router.push({name: 'new'});
}
</script>

<template>
    <section class="header">
        <div class="column--left">
            <h1 class="header__title">Chamada Cidadã</h1>
            <p class="header__description">Sistema de denúncias anônimas para a comunidade</p>
        </div>
        <div class="column--right">
            <v-btn class="btn--main" @click="navigateToForm">Nova denúncia</v-btn>
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

    .column--left, .column--right {
        display: flex;
        align-items: center;
    }

    .column--left {
        gap: 4px;
        justify-content: flex-start;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .column--right {
        justify-content: flex-end;
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
</style>