<script setup>
import { ref, onMounted, nextTick } from 'vue'
const headerHeight = ref(0)

onMounted(async () => {
  await nextTick()
  const el = document.querySelector('.container')
  if (el) headerHeight.value = el.offsetHeight
})
</script>

<template>
  <div class="container">
    <nav class="nav-links">
      <router-link to="/inicio">Inicio</router-link>
      <router-link to="/sabores">Sabores</router-link>
      <router-link to="/cotizar">Cotizar</router-link>
      <router-link to="/locales">Locales</router-link>
      <router-link to="/inicio_sesion">Inicio de sesión</router-link>
      <router-link to="/carrito">
        <img src="./assets/img/carrito.png" alt="carrito" class="carrito" />
      </router-link>
    </nav>
  </div>

  <main class="content" :style="{ marginTop: headerHeight + 'px' }">
    <router-view />
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}

.container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 90px;
  padding: 0 30px;
  background: rgba(255, 150, 37, 0.776);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  display: flex;
  align-items: center;
  height: 90px;
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}

.carrito {
  width: 80px;
  height: 60px;
  object-fit: contain;
}

.content {
  width: 100%;
}

/* Mobile/Tablet */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
    height: auto;           
    padding: 15px 20px;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    margin-top: 10px;
  }

  .nav-links a {
    height: auto;
    font-size: 15px;
  }

  .carrito {
    align-self: flex-end;
    width: 50px;
    height: 40px;
  }
}
</style>