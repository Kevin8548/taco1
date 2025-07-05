<template>
  <div class="app-container">
    <header>
      <h1>Carrito</h1>
    </header>

    <div class="card-grid">
      <FoodCard
        v-for="(item, index) in foods"
        :key="index"
        :food="item"
        :index="index"
        :isHighlighted="index % 2 === 1"
        @remove="removeItem"
        @update-qty="updateQty"
      />
    </div>
  </div>
<router-link to="/form_pedido">
<div class="contenedor">
  <button class="pedido" @click="irAOtraVista">Realizar pedido</button>
</div>
</router-link>


</template>

<script>
import FoodCard from '../components/FoodCard.vue'

export default {
  components: { FoodCard },
  data() {
    return {
      foods: [
        {
          title: 'Taco papa con pistache',
          image: '',
          description: 'tortillas de maíz\npapas (sobras), frías\nSalsa verde o roja, para acompañar',
          qty: 50
        },
        {
          title: 'Taco papa con pistache',
          image: '',
          description: 'tortillas de maíz\npapas (sobras), frías\nSalsa verde o roja, para acompañar',
          qty: 50
        },
        {
          title: 'Taco papa con pistache',
          image: '',
          description: 'tortillas de maíz\npapas (sobras), frías\nSalsa verde o roja, para acompañar',
          qty: 50
        },
        {
          title: 'Taco papa con pistache',
          image: '',
          description: 'tortillas de maíz\npapas (sobras), frías\nSalsa verde o roja, para acompañar',
          qty: 50
        }
      ]
    }
  },
  methods: {
    removeItem(index) {
      this.foods.splice(index, 1)
    },
    updateQty(index, qty) {
      this.foods[index].qty = qty
    }
  }
}
</script>

<style scoped>
.contenedor {
  text-align: right;
  padding-bottom: 20px;
  padding-right: 30px;
}

.pedido{
  background-color: #26ff00;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  align-items: end;
}

.app-container {
  min-height: 100vh;
  padding: 20px;
  font-family: sans-serif;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media screen and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

h1 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin: 0;
}

</style>
