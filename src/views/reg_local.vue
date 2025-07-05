<template>
  <div class="parent">
    <!-- Título -->
    <div class="div1">
      <h1>Registrar Local</h1>
    </div>

    <!-- Formulario con labels e inputs -->
    <div class="div2">
      <label class="texto" for="nombre">Nombre del Local:</label>
      <input id="nombre" type="text" v-model="nombre" placeholder="Ej. Tacos Don Memo" />

      <label class="texto" for="descripcion">Descripción:</label>
      <input
        id="descripcion"
        type="text"
        v-model="descripcion"
        placeholder="Breve descripción del local..."
      />

      <!-- Dirección -->
      <h3>Dirección:</h3>

      <label class="texto" for="calle">Calle:</label>
      <input id="calle" type="text" v-model="calle" placeholder="Ej. Av. Reforma" />

      <label class="texto" for="ciudad">Ciudad:</label>
      <input
        id="ciudad"
        type="text"
        v-model="ciudad"
        placeholder="Ej. Ciudad de México"
      />

      <label class="texto" for="codigoPostal">Código Postal:</label>
      <input
        id="codigoPostal"
        type="text"
        v-model="codigoPostal"
        placeholder="Ej. 06000"
      />

      <label class="texto" for="estado">Estado / Provincia / Zona:</label>
      <input id="estado" type="text" v-model="estado" placeholder="Ej. CDMX" />

      <label class="texto" for="entreCalles">Entre calles:</label>
      <input
        id="entreCalles"
        type="text"
        v-model="entreCalles"
        placeholder="Ej. Juárez y Madero"
      />

      <label class="texto" for="colonia">Colonia:</label>
      <input id="colonia" type="text" v-model="colonia" placeholder="Ej. Centro" />
    </div>

    <!-- Imágenes -->
    <div class="div3">
      <div class="imagen-group">
        <label class="texto">Imagen de Ubicación:</label>
        <input type="file" accept="image/*" @change="onUbicacionChange" />
        <div class="preview-box" v-if="ubicacionPreviewUrl">
          <img
            :src="ubicacionPreviewUrl"
            alt="Vista previa ubicación"
            class="preview-img"
          />
        </div>

        <label class="texto" style="margin-top: 20px">Imagen del Local:</label>
        <input type="file" accept="image/*" @change="onLocalChange" />
        <div class="preview-box" v-if="localPreviewUrl">
          <img :src="localPreviewUrl" alt="Vista previa local" class="preview-img" />
        </div>

        <button @click="showConfirmDialog" class="registrar">Registrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RegistrarLocal",
  data() {
    return {
      nombre: "",
      calle: "",
      ciudad: "",
      codigoPostal: "",
      estado: "",
      entreCalles: "",
      colonia: "",
      descripcion: "",
      ubicacionFile: null,
      ubicacionPreviewUrl: null,
      localFile: null,
      localPreviewUrl: null,
    };
  },
  methods: {
    onUbicacionChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (this.ubicacionPreviewUrl) URL.revokeObjectURL(this.ubicacionPreviewUrl);
        this.ubicacionFile = file;
        this.ubicacionPreviewUrl = URL.createObjectURL(file);
      } else {
        this.ubicacionPreviewUrl = null;
        this.ubicacionFile = null;
        alert("Por favor selecciona una imagen válida para la ubicación.");
      }
    },
    onLocalChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (this.localPreviewUrl) URL.revokeObjectURL(this.localPreviewUrl);
        this.localFile = file;
        this.localPreviewUrl = URL.createObjectURL(file);
      } else {
        this.localPreviewUrl = null;
        this.localFile = null;
        alert("Por favor selecciona una imagen válida para el local.");
      }
    },
    showConfirmDialog() {
      Swal.fire({
        title: "¿Deseas registrar este local?",
        text: "Se guardarán los datos ingresados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#308a00",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Sí, registrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Registrado!",
            text: "El local ha sido registrado exitosamente.",
            icon: "success",
          });
          // Aquí puedes agregar la lógica para enviar los datos al backend
        }
      });
    },
  },
  beforeUnmount() {
    if (this.ubicacionPreviewUrl) URL.revokeObjectURL(this.ubicacionPreviewUrl);
    if (this.localPreviewUrl) URL.revokeObjectURL(this.localPreviewUrl);
  },
};
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 40px;
  padding: 40px;
  font-family: "Roboto", sans-serif;
  color: #333;
}

/* Div1 - Título */
.div1 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

h1 {
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0;
}

/* Div2 - Formulario */
.div2 {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

h3 {
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: 600;
}

.texto {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

input[type="text"] {
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #aaa;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #9e5700;
  outline: none;
}

/* Div3 - Imagenes + botón */
.div3 {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.imagen-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 220px;
}

input[type="file"] {
  width: 100%;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1.5px solid #aaa;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="file"]:focus {
  border-color: #9e5700;
  outline: none;
}

/* Preview imágenes */
.preview-box {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 5px #ddd;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: white;
}

/* Botón registrar */
.registrar {
  margin-top: 25px;
  padding: 14px 0;
  width: 100%;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
  box-shadow: 0 0 8px #4caf50aa;
}

.registrar:hover {
  background-color: #388e3c;
  box-shadow: 0 0 12px #388e3ccc;
}

/* Responsive */
@media (max-width: 900px) {
  .parent {
    grid-template-columns: 1fr;
    padding: 25px 20px;
    gap: 30px;
  }

  .div1 {
    justify-content: center;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  .div2 {
    align-items: center;
  }

  .imagen-group {
    width: 100%;
    align-items: center;
  }

  .preview-box {
    width: 100%;
    max-width: 300px;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .registrar {
    width: 100%;
  }
}
</style>
