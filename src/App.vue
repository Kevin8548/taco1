<template>
  <div class="container">
    <div class="logo">
      <router-link to="/">
        <img :src="logo" alt="Logo" class="logo-img" />
      </router-link>
    </div>

    <nav class="nav-links">
      <router-link to="/inicio">Inicio</router-link>
      <router-link to="/sabores">Sabores</router-link>
      <router-link to="/cotizar">Cotizar</router-link>
      <router-link to="/locales">Locales</router-link>

      <router-link v-if="!currentUser" to="/inicio_sesion">
        Iniciar sesión
      </router-link>
      <router-link
        v-else
        :to="{ name: 'Perfil', params: { id: currentUser.id } }"
      >
        Perfil
      </router-link>

      <router-link to="/carrito">
        <img
          :src="cartIcon"
          alt="carrito"
          class="carrito"
          :class="{ flipped }"
        />
      </router-link>
    </nav>
  </div>

  <main class="content" :style="{ marginTop: headerHeight + 'px' }">
    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useCarritoStore } from './stores/carrito'
import carrito from './assets/img/carrito.png'
import carrito2 from './assets/img/carrito2.png'
import logo from './assets/img/logo.png'

const headerHeight = ref(0)
const currentUser  = ref(null)
const cartStore    = useCarritoStore()
const flipped      = ref(false)

const cartIcon = computed(() =>
  cartStore.items.length > 0 ? carrito2 : carrito
)

// Disparamos la clase 'flipped' en cada cambio de icono
watch(cartIcon, () => {
  flipped.value = true
  setTimeout(() => (flipped.value = false), 600)
})

onMounted(async () => {
  await nextTick()
  const el = document.querySelector('.container')
  if (el) headerHeight.value = el.offsetHeight

  try {
    const raw = localStorage.getItem('currentUser')
    if (raw) currentUser.value = JSON.parse(raw)
  } catch (e) {
    console.warn('No se pudo parsear el usuario:', e)
  }
})
</script>

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
  justify-content: space-between;
  z-index: 1000;
}

.logo-img {
  height: 60px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  display: flex;
  align-items: center;
  height: 90px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}

.carrito {
  width: 80px;
  height: 60px;
  object-fit: contain;
  display: block;
  transform-origin: center center;
}

/* La voltereta en su propio lugar */
@keyframes flip {
  0% {
    transform: perspective(600px) rotateY(0deg);
  }
  50% {
    transform: perspective(600px) rotateY(180deg);
  }
  100% {
    transform: perspective(600px) rotateY(360deg);
  }
}

.carrito.flipped {
  animation: flip 0.6s ease-in-out;
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

  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .logo-img {
    height: 50px;
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