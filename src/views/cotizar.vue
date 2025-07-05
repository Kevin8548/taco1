<template>
  <h1>Cotizar</h1>
  <h2>Bienvenido a Chiquihuitl Tacos</h2>


<div class="linea-personas">
  <p>Cantidad de personas:</p>
  <button @click="decrementPersonas" class="contador">-</button>
  <input type="number" class="numero-input" v-model.number="personas" min="1" />
  <button @click="incrementPersonas" class="contador">+</button>
</div>

<div class="linea-personas">
  <p>Cantidad de orden:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
  <button @click="decrementOrden" class="contador">-</button>
  <input type="number" class="numero-input" v-model.number="Orden" min="1" />
  <button @click="incrementOrden" class="contador">+</button>
</div>


<div class="linea-personas">
  <label class="label-sabor" for="Sabor">Selecciona un sabor:</label>
  <div class="select-wrapper">
    <v-select
      :options="opciones"
      v-model="opcionSeleccionada"
      placeholder="Buscar y seleccionar un sabor"
    />
  </div>
</div>


  <button class="button-cotizar">Cotizar</button>
  <h2>Total: {{ total }} </h2>
</template>

<script setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

//contador personas
import { ref, computed, watch } from 'vue'

const personas = ref(1)
const Orden = ref(1)

const incrementPersonas = () => {
  personas.value++
}

const decrementPersonas = () => {
  if (personas.value > 1) {
    personas.value--
  }
}
//fin contador

// contador orden
const incrementOrden = () => {
  Orden.value++
}
const decrementOrden = () => {
  if (Orden.value > 1) {
    Orden.value--
  }
}

//selección de sabor
// Sabor
const opciones = [
  'Frijol','Chicharron','Papa','Garbanzo','Queso','Carnitas','Aguacate',
]
const opcionSeleccionada = ref(null)

//total
const total = computed(() => {
  return personas.value * Orden.value * 10 // ejemplo de cálculo
})

watch(personas, (newVal) => {
  if (newVal < 1) personas.value = 1
})

watch(Orden, (newVal) => {
  if (newVal < 1) Orden.value = 1
})
</script>

<style>
.numero-input {
  width: 60px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ffffff;
  
}

label {
  font-family: 'Roboto', sans-serif;
  padding-left: 200px;
  text-align: left;
  font-size: 30px;
  margin-top: 25px;
  padding-bottom: 25px;
}

.select-wrapper {
  font-family: 'Roboto', sans-serif;
  flex: 0 0 200px;
  max-width: 200px;
}

.linea-personas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 24px;
  margin-top: 25px;
  padding-right: 200px;
}

.numero {
  font-family: 'Roboto', sans-serif;
  width: 40px;
  text-align: center;
  font-weight: bold;
  color: black;
}

.contador {
  font-size: 18px;
  padding: 5px 10px;
  background-color: #D2782A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0;

}

.button-cotizar {
  font-family: 'Roboto', sans-serif;
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #D2782A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p{
  font-family: 'Roboto', sans-serif;
  padding-left: 200px;
  text-align: left;
  font-size: 30px;
  margin-top: 25px;
}

h2{
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
}

h1{
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-top: 20px;
  font-size: 35px;
  font-weight: bold;
}
</style>
