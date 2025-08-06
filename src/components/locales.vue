<template>
  <div
    class="local-card"
    :class="{ orange: isHighlighted, yellow: !isHighlighted }"
  >
    <img
      :src="fotoLocalSrc"
      alt="Foto del local"
      class="local-img"
    />

    <h3>{{ local.title }}</h3>

    <p class="local-address">
      {{ local.street }}, {{ local.neighborhood }}, {{ local.city }},
      {{ local.state }} – CP {{ local.zip }}
    </p>

    <p class="local-description">{{ local.description }}</p>

    <template v-if="ubicacionSrc">
      <a
        v-if="ubicacionUrl"
        :href="ubicacionUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="ubicacion-link"
      >
        <img
          :src="ubicacionSrc"
          alt="Ubicación del local"
          class="local-img ubicacion"
        />
      </a>
      <img
        v-else
        :src="ubicacionSrc"
        alt="Ubicación del local"
        class="local-img ubicacion"
      />
    </template>

    <div class="buttons">
      <router-link
        v-if="rolValido"
        :to="`/editar-local/${local.id}`"
      >
        <button>Editar</button>
      </router-link>

      <router-link
        :to="`/locales/${local.id}/comentarios`"
      >
        <button>Comentarios</button>
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
    ubicacionUrl() {
      return this.local.urlMap || this.local.url_ubicacion_maps || null;
    },
    rolValido() {
      const rol = this.$route.params.rol;
      return ["admin", "vendedor"].includes(rol);
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

.local-img {
  width: 60%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin-top: -12px; /* más arriba */
  margin-bottom: 6px;
}

.local-img.ubicacion {
  margin-top: -10px;
  margin-bottom: 8px;
}

.ubicacion-link {
  display: flex;
  justify-content: center;
  width: 100%;
}

.ubicacion-link img {
  width: 60%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: -10px;
  margin-bottom: 8px;
}

.local-card h3 {
  margin: 6px 0 4px;
  text-align: center;
  font-size: 16px;
}

.local-address {
  text-align: center;
  font-size: 14px;
  margin: 4px auto;
  max-width: 90%;
}

.local-description {
  text-align: center;
  font-size: 13px;
  color: #333;
  margin: 4px 0 10px;
  font-style: italic;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: auto;
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
}

.buttons button:hover {
  background-color: #f3ff11;
}
</style>