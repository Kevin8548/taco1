<template>
  <div class="contenedor">
    <h1>Editar Usuario</h1>

    <div class="fila">
      <div class="campo">
        <label>Nombre</label>
        <input type="text" v-model="sabor" placeholder="Escribe tu nombre..." />
      </div>
      <div class="campo">
        <label>Apellidos</label>
        <input type="text" v-model="precio" placeholder="Escribe tus apellidos..." />
      </div>
    </div>

    <div class="fila">
      <div class="campo">
        <label>Contacto</label>
        <input type="text" v-model="descripcion" placeholder="Escribe tu número o correo..." />
      </div>
      <div class="campo">
        <label>Imagen</label>
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>
    </div>

    <h3 class="subtitulo">Dirección</h3>

    <div class="fila">
      <div class="campo">
        <label>Calle</label>
        <input type="text" v-model="form.direccion.calle" />
      </div>
      <div class="campo">
        <label>Ciudad</label>
        <input type="text" v-model="form.direccion.ciudad" />
      </div>
    </div>

    <div class="fila">
      <div class="campo">
        <label>Código Postal</label>
        <input type="text" v-model="form.direccion.codigoPostal" />
      </div>
      <div class="campo">
        <label>Estado / Provincia / Zona</label>
        <input type="text" v-model="form.direccion.estado" />
      </div>
    </div>

    <div class="fila">
      <div class="campo campo-grande">
        <label>Entre calles</label>
        <input type="text" v-model="form.direccion.entreCalles" />
      </div>
      <div class="preview" v-if="previewUrl">
        <img :src="previewUrl" alt="Vista previa" />
      </div>
    </div>

    <div class="botones">
      <button class="editar" @click="showConfirmDialog('editar')">Editar</button>
      <button class="eliminar" @click="showConfirmDialog('eliminar')">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import Swal from 'sweetalert2'

const sabor = ref('')
const precio = ref('')
const descripcion = ref('')
const previewUrl = ref(null)
let objectUrl = null

const form = reactive({
  direccion: {
    calle: '',
    ciudad: '',
    codigoPostal: '',
    estado: '',
    entreCalles: ''
  }
})

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(file)
    previewUrl.value = objectUrl
  } else {
    previewUrl.value = null
    alert('Por favor selecciona una imagen válida.')
  }
}

onBeforeUnmount(() => {
  if (objectUrl) URL.revokeObjectURL(objectUrl)
})

const showConfirmDialog = (action) => {
  const opciones = {
    editar: {
      title: "¿Seguro que quieres editar?",
      text: "Estás a punto de modificar el registro.",
      confirmButtonText: "Estoy seguro",
      successTitle: "¡Editado!",
      successText: "El registro ha sido editado.",
    },
    eliminar: {
      title: "¿Seguro que quieres eliminar?",
      text: "Esta acción no se puede deshacer.",
      confirmButtonText: "Sí, estoy seguro",
      successTitle: "¡Eliminado!",
      successText: "El registro ha sido eliminado.",
    }
  }

  const { title, text, confirmButtonText, successTitle, successText } = opciones[action]

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
      })
    }
  })
}
</script>

<style scoped>
.contenedor {
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  background: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
}

.subtitulo {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
}

.fila {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.campo {
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
}

.campo-grande {
  flex: 2;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  padding: 14px 18px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  width: 100%;
}

.preview {
  flex: 1;
  border: 1px dashed #ccc;
  background-color: #eee;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  min-width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview img {
  max-width: 240px;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
  background: #fff;
}

.botones {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.editar,
.eliminar {
  padding: 12px 22px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.editar {
  background-color: #ffe600;
  color: black;
}

.eliminar {
  background-color: #d33;
  color: white;
}

@media (max-width: 768px) {
  .fila {
    flex-direction: column;
  }

  .campo {
    min-width: 100%;
  }

  .botones {
    flex-direction: column;
    gap: 12px;
  }
}
</style>