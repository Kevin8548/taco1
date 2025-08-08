<template>
  <div class="contenedor">
    <h1>Editar Usuario</h1>

    <div class="fila">
      <div class="campo">
        <label>Nombre</label>
        <input
          type="text"
          v-model="form.nombre"
          placeholder="Escribe tu nombre..."
        />
      </div>
      <div class="campo">
        <label>Apellidos</label>
        <input
          type="text"
          v-model="form.apellidos"
          placeholder="Escribe tus apellidos..."
        />
      </div>
    </div>

    <div class="fila">
      <div class="campo">
        <label>Correo electrónico</label>
        <input
          type="email"
          v-model="form.correo_electronico"
          placeholder="Escribe tu correo electrónico..."
        />
      </div>
      <div class="campo">
        <label>Nueva Contraseña</label>
        <input
          type="password"
          v-model="form.contrasena"
          placeholder="Escribe la contraseña..."
        />
      </div>
    </div>

    <div class="fila">
      <div class="campo">
        <label>Contacto</label>
        <input
          type="text"
          v-model="form.contacto"
          placeholder="Escribe tu número o correo..."
        />
      </div>
      <div class="campo">
        <label>Imagen</label>
        <div class="input-file">
          <label class="input-file-label" for="imagen">🖼️ Galería</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            @change="onFileChange"
            class="file-input"
          />
        </div>
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
        <input type="text" v-model="form.direccion.codigo_postal" />
      </div>
      <div class="campo">
        <label>Estado / Provincia / Zona</label>
        <input type="text" v-model="form.direccion.estado_provincia_zona" />
      </div>
    </div>

    <div class="fila">
      <div class="campo campo-grande">
        <label>Entre calles</label>
        <input type="text" v-model="form.direccion.entre_calles" />
      </div>
      <div class="preview" v-if="previewUrl">
        <img :src="previewUrl" alt="Vista previa" />
      </div>
    </div>

    <div class="botones">
      <button class="editar" @click="guardarCambios">Guardar</button>
      <button class="eliminar" @click="eliminarUsuario">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const form = reactive({
  nombre: '',
  apellidos: '',
  correo_electronico: '',
  contrasena: '',
  contacto: '',
  tipo_usuario: '',
  direccion: {
    calle: '',
    ciudad: '',
    codigo_postal: '',
    estado_provincia_zona: '',
    entre_calles: ''
  },
  foto_perfil: '' // aquí guardamos Base64 o URL
})

const contrasenaOriginal = ref('')
const previewUrl = ref(null)
let objectUrl = null
let archivoSeleccionado = null

// 1) Carga del usuario
async function loadUsuario() {
  const id = route.params.id
  try {
    const res = await fetch(`http://localhost:3000/api/usuarios/${id}`)
    if (!res.ok) throw new Error('No se pudo obtener usuario')
    const data = await res.json()

    form.nombre = data.nombre || ''
    form.apellidos = data.apellidos || ''
    form.correo_electronico = data.correo_electronico || ''
    form.contacto = data.contacto || ''
    form.tipo_usuario = data.tipo_usuario || ''

    // Guardamos internamente la contraseña original
    contrasenaOriginal.value = data.contrasena || ''
    form.contrasena = '' // dejamos el campo vacío

    // Dirección: puede venir como objeto o campos sueltos
    if (data.direccion) {
      Object.assign(form.direccion, data.direccion)
    } else {
      form.direccion.calle = data.calle || ''
      form.direccion.ciudad = data.ciudad || ''
      form.direccion.codigo_postal = data.codigo_postal || ''
      form.direccion.estado_provincia_zona = data.estado_provincia_zona || ''
      form.direccion.entre_calles = data.entre_calles || ''
    }

    // Foto de perfil
    form.foto_perfil = data.foto_perfil || ''
    previewUrl.value = data.foto_perfil || null
  } catch (err) {
    console.error(err)
    await Swal.fire('Error', 'No se pudo cargar la información del usuario.', 'error')
    router.back()
  }
}

onMounted(loadUsuario)

// 2) Manejo de cambio de imagen
function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(file)
    previewUrl.value = objectUrl
    archivoSeleccionado = file
  } else {
    archivoSeleccionado = null
    previewUrl.value = null
    Swal.fire('Error', 'Por favor selecciona una imagen válida.', 'error')
  }
}

onBeforeUnmount(() => {
  if (objectUrl) URL.revokeObjectURL(objectUrl)
})

// 3) Conversión de File a Base64
function convertirArchivoABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject('Error al convertir imagen')
    reader.readAsDataURL(file)
  })
}

// 4) Guardar cambios
async function guardarCambios() {
  const { isConfirmed } = await Swal.fire({
    title: '¿Seguro que quieres editar?',
    text: 'Se actualizarán los datos del usuario.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar'
  })
  if (!isConfirmed) return

  try {
    const id = route.params.id

    // Si seleccionaron nueva imagen, conviértela
    let foto = form.foto_perfil
    if (archivoSeleccionado) {
      foto = await convertirArchivoABase64(archivoSeleccionado)
    }

    // Coerción segura del código postal a string
    const rawCP = form.direccion.codigo_postal
    const codigo_postal = rawCP != null ? String(rawCP).trim() : ''

    // Construimos el payload
    const payload = {
      nombre: String(form.nombre).trim(),
      apellidos: String(form.apellidos).trim(),
      correo_electronico: String(form.correo_electronico).trim(),
      contacto: String(form.contacto).trim(),
      tipo_usuario: form.tipo_usuario,
      contrasena: form.contrasena.trim()
        ? form.contrasena.trim()
        : contrasenaOriginal.value,
      calle: String(form.direccion.calle).trim(),
      ciudad: String(form.direccion.ciudad).trim(),
      codigo_postal,
      estado_provincia_zona: String(form.direccion.estado_provincia_zona).trim(),
      entre_calles: String(form.direccion.entre_calles).trim(),
      foto_perfil: foto
    }

    const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Error al actualizar')

    await Swal.fire('¡Listo!', 'Usuario actualizado correctamente.', 'success')
    router.push('/usuario')
  } catch (err) {
    console.error(err)
    await Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error')
  }
}

// 5) Eliminar usuario
async function eliminarUsuario() {
  const { isConfirmed } = await Swal.fire({
    title: '¿Eliminar usuario?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })
  if (!isConfirmed) return

  try {
    const id = route.params.id
    const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar')

    await Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success')
    router.push('/usuario')
  } catch (err) {
    console.error(err)
    await Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error')
  }
}
</script>
<style scoped>
.input-file input[type="file"] {
  display: none;
}

.campo {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 5px 5px 10px -5px; /* reducido margen arriba y extendido a la izquierda */
  width: 100%; /* aseguramos que ocupe todo el ancho disponible */
}

input[type="text"],
input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-size: 16px;
}

/* Estilo del botón de archivo personalizado */
.input-file-label {
  display: inline-block;
  padding: 12px 250px 12px 130px;
  background-color: #eee;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content;
  margin-top: -1px; /* sube el botón */
  margin-left: -5px; /* mueve un poco a la izquierda */
}

.input-file-label:hover {
  background-color: #ddd;
}

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
input[type="file"],
input[type="email"],
input[type="password"] {
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