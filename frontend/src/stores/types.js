import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTypesStore = defineStore('types', () => {
  const types = reactive({
    Cidade: [{
      id: 1,
      name: 'Buraco na rua',
      color: 'blue',
      category: 'infrastructure'
    },
    {
      id: 2,
      name: 'Luz queimada',
      color: 'blue',
      category: 'infrastructure'
    },
    {
      id: 3,
      name: 'Placas / semáforos',
      color: 'blue',
      category: 'infrastructure'
    },
    {
      id: 4,
      name: 'Calçada quebrada',
      color: 'blue',
      category: 'infrastructure'
    },
  ], 'Limpeza e Saúde': [
    {
      id: 5,
      name: 'Lixo / entulho',
      color: 'green',
      category: 'cleaning'
    },
    {
      id: 6,
      name: 'Animais soltos',
      color: 'green',
      category: 'cleaning'
    },
    {
      id: 7,
      name: 'Água parada (Dengue)',
      color: 'green',
      category: 'cleaning'
    },
    {
      id: 8,
      name: 'Vegetação excessiva',
      color: 'green',
      category: 'cleaning'
    },
  ], 'Segurança e trânsito': [
    {
      id: 9,
      name: 'Carro abandonado',
      color: 'grey',
      category: 'security'
    },
    {
      id: 10,
      name: 'Vandalismo / pichação',
      color: 'grey',
      category: 'security'
    },
    {
      id: 11,
      name: 'Perturbação do sossego',
      color: 'grey',
      category: 'security'
    },
  ], 'Outros':
    {
      id: 12,
      name: 'Outros',
      color: 'indigo',
      category: 'security'
    }
})

  return {types}
})
