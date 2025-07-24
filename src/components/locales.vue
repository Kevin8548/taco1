<!-- src/components/Locales.vue -->
<template>
  <div class="local-card" :class="{ orange: isHighlighted, yellow: !isHighlighted }">
    <!-- Foto del Local -->
    <img :src="fotoLocalSrc" alt="Local" class="local-card" />
    <h3>{{ local.title }}</h3>
    <p>{{ local.description }}</p>
    <!-- Imagen de Ubicación -->
    <img v-if="ubicacionSrc" :src="ubicacionSrc" alt="Ubicación" class="local-card" />
    <div class="buttons">
      <router-link :to="`/editar-local/${local.id}`">
        <button>Editar</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import imgFallback from "../assets/img/repartocansta.png";

export default {
  name: "Locales",
  props: {
    local: { type: Object, required: true },
    isHighlighted: { type: Boolean, default: false },
  },
  computed: {
    fotoLocalSrc() {
      const b64 = this.local.fotoLocal;
      if (!b64) return imgFallback;
      return b64.startsWith("data:image")
        ? b64
        : `data:image/jpeg;base64,${b64}`;
    },
    ubicacionSrc() {
      const b64 = this.local.imagenUbicacion;
      if (!b64) return null;
      return b64.startsWith("data:image")
        ? b64
        : `data:image/jpeg;base64,${b64}`;
    },
  },
};
</script>


<style scoped>
.local-card {
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  font-size: 30px;
  background-color: white;
}

.local-card.yellow {
  background-color: #fff59d;
}
.local-card.orange {
  background-color: #ffb74d;
}

.local-card:hover {
  transform: scale(1.03);
}

.local-card img {
  width: 60%;
  height: 18%px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.local-card h3 {
  margin: 8px 0 4px;
  text-align: center;
  font-size: 16px;
}

.local-card p {
  text-align: center;
  font-size: 13px;
}

.card-footer-image img {
  margin-top: 15px;
  width: 100%;
  border-radius: 8px;
}

.card-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
  width: 100%;
}

.card-buttons button {
  flex: 1;
  height: 45px;
  padding: 6px 8px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  outline: none;
}

.buttons button {
  background-color: #bc8912;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  font-size: 13px;
  display: flex;
  align-items: center;
  outline: none;
}

/* Hover effect */
.buttons button:hover {
  background-color: #f3ff11;
}

 </style>