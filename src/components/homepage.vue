<script setup>
import navbar from './navbar.vue'
import HeaderHome from './HeaderHome.vue'
import { ref } from 'vue';

const btnStrings = {
  true: 'Esconder Denúncias',
  false: 'Ver Denúncias Existentes'
}

let complaints = null;
const showComplaints = ref(false);
const btnStr = ref(btnStrings[showComplaints ? 'true' : 'false'])

function toggleComplaintsView() {
  showComplaints.value = !showComplaints.value
}
</script>

<template>
  <HeaderHome></HeaderHome>

  <v-btn v-show="!showComplaints" variant="plain" class="btn--view_existing" @click="toggleComplaintsView">Ver Denúncias Existentes</v-btn>
  <v-btn v-show="showComplaints" variant="plain" class="btn--view_existing" @click="toggleComplaintsView">Esconder Denúncias</v-btn>

  <div class="complaints__box">
    <div class="complaints__item" v-for="item of complaints">
      <span class="complaints__category"></span>
      <span class="complaints__description"></span>
      <span class="complaints__city"></span>
    </div>
  </div>

  <section class="note">
    <h2 class="note__title">Ajude-nos a melhorar a cidade!</h2>

    <p class="note__description">
      Suas denúncias anônimas nos ajudam a identificar e resolver problemas em nossa comunidade.
      Cada denúncia é importante e contribui para tornar nossa cidade melhor para todos.
    </p>

    <!-- <v-btn class="btn--main">Criar nova denuncia</v-btn> -->
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

  margin: auto 20px;
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
</style>
