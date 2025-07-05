<template>
  <div class="parent">
    <!-- Título -->
    <div class="div1">
      <h1>Registrar Usuario</h1>
    </div>

    <!-- Formulario -->
    <div class="div2">
      <label class="texto">Nombre:</label>
      <input v-model="form.nombre" type="text" />

      <label class="texto">Apellidos:</label>
      <input v-model="form.apellidos" type="text" />

      <label class="texto">Contacto:</label>
      <input v-model="form.contacto" type="text" />

      <label class="texto">Tipo de usuario:</label>
      <select v-model="form.tipoUsuario">
        <option value="Administrador">Administrador</option>
        <option value="Empleado">Empleado</option>
        <option value="Cliente">Cliente</option>
      </select>

      <h3>Dirección:</h3>

      <label class="texto">Calle:</label>
      <input v-model="form.direccion.calle" type="text" />

      <label class="texto">Ciudad:</label>
      <input v-model="form.direccion.ciudad" type="text" />

      <label class="texto">Código postal:</label>
      <input v-model="form.direccion.codigoPostal" type="text" />

      <label class="texto">Estado/provincia/zona:</label>
      <input v-model="form.direccion.estado" type="text" />

      <label class="texto">Entre calles:</label>
      <input v-model="form.direccion.entreCalles" type="text" />
    </div>

    <!-- Imagen y botón -->
    <div class="div3">
      <div class="imagen-container">
        <label class="texto">Imagen de perfil:</label>
        <input type="file" accept="image/*" @change="onUsuarioImageChange" />
        <div v-if="usuarioPreviewUrl" class="preview-box">
          <img :src="usuarioPreviewUrl" alt="Vista previa" class="preview-img" />
        </div>
      </div>

      <button type="button" class="registrar" @click="confirmarRegistro">Registrar</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RegistroUsuario",
  data() {
    return {
      form: {
        nombre: "",
        apellidos: "",
        contacto: "",
        tipoUsuario: "Administrador",
        direccion: {
          calle: "",
          ciudad: "",
          codigoPostal: "",
          estado: "",
          entreCalles: "",
        },
      },
      usuarioFile: null,
      usuarioPreviewUrl: null,
    };
  },
  methods: {
    onUsuarioImageChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (this.usuarioPreviewUrl) URL.revokeObjectURL(this.usuarioPreviewUrl);
        this.usuarioFile = file;
        this.usuarioPreviewUrl = URL.createObjectURL(file);
      } else {
        this.usuarioPreviewUrl = null;
        this.usuarioFile = null;
        alert("Por favor selecciona una imagen válida.");
      }
    },
    confirmarRegistro() {
      Swal.fire({
        title: "¿Desea registrar este Usuario?",
        text: "...",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFF07F",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, registrar Usuario!",
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
            text: "Usuario registrado con éxito",
            icon: "success",
          });
        }
      });
    },
  },
  beforeUnmount() {
    if (this.usuarioPreviewUrl) URL.revokeObjectURL(this.usuarioPreviewUrl);
  },
};
</script>

<style scoped>
/* Estilo general igual al otro componente */
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
  gap: 0px;
}

.texto {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

input[type="text"],
select,
input[type="file"] {
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #aaa;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
select:focus,
input[type="file"]:focus {
  border-color: #9e5700;
  outline: none;
}

h3 {
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: 600;
}

/* Div3 - Imagen y botón */
.div3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Contenedor imagen para alinear selector y preview */
.imagen-container {
  display: flex;
  flex-direction: column;
  width: 220px;
  gap: 10px;
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
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: white;
}

/* Botón registrar estilo igual */
.registrar {
  margin-top: 0;
  padding: 14px 0;
  width: 220px;
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

  .imagen-container {
    width: 100%;
    max-width: 300px;
    align-items: center;
  }

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
