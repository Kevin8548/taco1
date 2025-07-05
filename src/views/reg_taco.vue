<template>
  <div class="parent">
    <!-- Columna izquierda: título -->
    <div class="div1">
      <h2>Registrar Sabores</h2>
    </div>

    <!-- Columna centro: formulario campos -->
    <div class="div2">
      <label class="texto">Sabor:</label>
      <input v-model="form.sabor" type="text" />

      <label class="texto">Precio:</label>
      <input v-model="form.precio" type="text" />

      <label class="texto">Descripción:</label>
      <input v-model="form.descripcion" type="text" />
    </div>

    <!-- Columna derecha: imagen y botón -->
    <div class="div3">
      <div class="imagen-container">
        <label class="texto">Imagen del sabor:</label>
        <input type="file" accept="image/*" @change="onImageChange" />
        <div v-if="previewUrl" class="preview-box">
          <img :src="previewUrl" alt="Vista previa" class="preview-img" />
        </div>
        <div v-else class="imagen-placeholder"></div>
      </div>
      <button type="button" class="registrar" @click="registrarSabor">
        Registrar
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RegistroSabores",
  data() {
    return {
      form: {
        sabor: "",
        precio: "",
        descripcion: "",
      },
      file: null,
      previewUrl: null,
    };
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
        this.file = file;
        this.previewUrl = URL.createObjectURL(file);
      } else {
        this.previewUrl = null;
        this.file = null;
        alert("Por favor selecciona una imagen válida.");
      }
    },
    registrarSabor() {
      Swal.fire({
        title: "¿Desea registrar este sabor?",
        text: "...",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFF07F",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, registrar sabor!",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "swal2-popup-black",
          title: "swal2-title-black",
          content: "swal2-content-black",
          confirmButton: "swal2-confirm-custom",
          cancelButton: "swal2-cancel-custom",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Registrado con éxito!",
            text: "Sabor registrado con éxito",
            icon: "success",
          });
          // Aquí puedes agregar la lógica para enviar el formulario
          console.log("Datos sabor:", this.form);
        }
      });
    },
  },
  beforeUnmount() {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
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

h2 {
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
}

/* Div2 - Campos */
.div2 {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

/* Div3 - Imagen y botón */
.div3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Contenedor imagen */
.imagen-container {
  display: flex;
  flex-direction: column;
  width: 220px;
  gap: 10px;
}

.imagen-placeholder {
  width: 200px;
  height: 200px;
  background-color: #ddd;
  border: 2px dashed #aaa;
  border-radius: 12px;
  margin-top: 10px;
  box-shadow: inset 0 0 5px #ddd;
}

.preview-box {
  width: 200px;
  height: 200px;
  border: 2px dashed #aaa;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 5px #ddd;
  margin-top: 10px;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: white;
}

input[type="file"] {
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #aaa;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

input[type="file"]:focus,
input[type="file"]:hover {
  border-color: #9e5700;
  outline: none;
}

/* Botón registrar */
.registrar {
  margin-top: 0;
  padding: 14px 0;
  width: 220px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: #9e5700;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
  box-shadow: 0 0 8px #9e5700aa;
}

.registrar:hover {
  background-color: #7c4400;
  box-shadow: 0 0 12px #7c4400cc;
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

  h2 {
    font-size: 1.7rem;
    text-align: center;
  }

  .div2 {
    align-items: center;
  }

  .imagen-container {
    width: 100%;
    max-width: 300px;
    align-items: center;
  }

  .imagen-placeholder,
  .preview-box {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .registrar {
    width: 100%;
  }
}
</style>
