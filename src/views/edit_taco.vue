<template>
  <div class="parent">
    <div class="div1">
      <h1>Editar</h1>
    </div>

    <div class="div2">
      <label class="texto">Sabor:</label>
      <input type="text" v-model="sabor" placeholder="Escribe el sabor..." />

      <label class="texto">Precio:</label>
      <input type="number" v-model="precio" placeholder="Escribe el precio..." />

      <label class="texto">Descripción:</label>
      <input type="text" v-model="descripcion" placeholder="Escribe la descripción..." />

      <label class="texto">Imagen:</label>
      <input type="file" @change="onFileChange" accept="image/*" />
    </div>

    <div class="div3">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div class="preview-box" v-if="previewUrl">
      <img :src="previewUrl" alt="Vista previa" class="preview-img" />
    </div>
    <br>
    <button @click="() => showConfirmDialog('editar')" class="editar">Editar</button>
    <br>
    <button @click="() => showConfirmDialog('eliminar')" class="eliminar">Eliminar</button>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'EditarProducto',
  data() {
    return {
      sabor: '',
      precio: '',
      descripcion: '',
      previewUrl: null,
      objectUrl: null
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        if (this.objectUrl) {
          URL.revokeObjectURL(this.objectUrl);
        }
        this.objectUrl = URL.createObjectURL(file);
        this.previewUrl = this.objectUrl;
      } else {
        this.previewUrl = null;
        alert('Por favor selecciona una imagen válida.');
      }
    }
  },
  beforeDestroy() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
};
</script>

<script setup>
import Swal from 'sweetalert2'

const showConfirmDialog = (action) => {
  let title, text, confirmButtonText, successTitle, successText;

  if (action === 'editar') {
    title = "¿Seguro que quieres editar?";
    text = "Estás a punto de modificar el registro.";
    confirmButtonText = "Estoy seguro";
    successTitle = "¡Editado!";
    successText = "El registro ha sido editado.";
  } else {
    title = "¿Seguro que quieres eliminar?";
    text = "Esta acción no se puede deshacer.";
    confirmButtonText = "Sí, estoy seguro";
    successTitle = "¡Eliminado!";
    successText = "El registro ha sido eliminado.";
  }

  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: successTitle,
        text: successText,
        icon: "success"
      });
    }
  });
};
</script>

<style scoped>
.eliminar {
  padding: 8px 16px;
  background-color: #d33;
  color: white;
  border: none;
  cursor: pointer;
}

.editar {
  padding: 8px 16px;
  background-color: rgb(255, 255, 0);
  color: black;
  border: none;
  cursor: pointer;
}

.texto {
  font-family: 'Roboto', sans-serif;
  font-size: 25px;
  margin-left: -100px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 6 / 2;
}

.div2 {
  grid-area: 1 / 2 / 6 / 5;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 40px;
}

.div3 {
  grid-area: 1 / 5 / 6 / 6;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: 'Roboto', sans-serif;
  text-align: left;
  padding-top: 250px;
  padding-left: 30px;
}

label {
  font-family: 'Roboto', sans-serif;
  margin-left: 100px;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  font-family: 'Roboto', sans-serif;
  width: 60%;
  padding: 10px;
  margin: 0 0 10px 100px;
  box-sizing: border-box;
  border: 1px solid #343434;
  border-radius: 4px;
}

/* Recuadro de imagen */
.preview-box {
  width: 200px;
  height: 200px;
  border: 2px dashed #aaa;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid #333;
  background-color: white;
}
/* Responsividad */
@media (max-width: 768px) {
  .parent {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .div1,
  .div2,
  .div3 {
    grid-area: auto;
    padding: 0;
    margin-bottom: 30px;
  }

  label,
  input[type="text"],
  input[type="number"],
  input[type="file"] {
    margin-left: 0;
    width: 100%;
  }

  h1 {
    text-align: center;
    padding: 20px 0;
  }

  .preview-box {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
}
</style>