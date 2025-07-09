<template>
  <div class="contenedor">
    <h1>Registrar Usuario</h1>

    <!-- Datos básicos -->
    <div class="grupo">
      <div class="campo">
        <label>Nombre</label>
        <input v-model="form.nombre" type="text" placeholder="Ej. Juan" />
      </div>
      <div class="campo">
        <label>Apellidos</label>
        <input v-model="form.apellidos" type="text" placeholder="Ej. Pérez García" />
      </div>
    </div>

    <div class="grupo">
      <div class="campo">
        <label>Contacto</label>
        <input v-model="form.contacto" type="text" placeholder="Ej. 555-123-4567 / correo@example.com" />
      </div>
      <div class="campo">
        <label>Tipo de usuario</label>
        <select v-model="form.tipoUsuario">
          <option value="Administrador">Administrador</option>
          <option value="Empleado">Empleado</option>
          <option value="Cliente">Cliente</option>
        </select>
      </div>
    </div>

    <!-- Dirección -->
    <h3>Dirección</h3>
    <div class="grupo">
      <div class="campo">
        <label>Calle</label>
        <input v-model="form.direccion.calle" type="text" placeholder="Ej. Av. Reforma" />
      </div>
      <div class="campo">
        <label>Ciudad</label>
        <input v-model="form.direccion.ciudad" type="text" placeholder="Ej. Ciudad de México" />
      </div>
    </div>

    <div class="grupo">
      <div class="campo">
        <label>Código postal</label>
        <input v-model="form.direccion.codigoPostal" type="text" placeholder="Ej. 06000" />
      </div>
      <div class="campo">
        <label>Estado / Provincia / Zona</label>
        <input v-model="form.direccion.estado" type="text" placeholder="Ej. CDMX" />
      </div>
    </div>

    <div class="campo">
      <label>Entre calles</label>
      <input v-model="form.direccion.entreCalles" type="text" placeholder="Ej. Juárez y Madero" />
    </div>

    <!-- Imagen de perfil -->
    <div class="imagen-preview">
      <label>Imagen de perfil</label>
      <input type="file" accept="image/*" @change="onUsuarioImageChange" />
      <div v-if="usuarioPreviewUrl" class="preview">
        <img :src="usuarioPreviewUrl" alt="Vista previa de perfil" />
      </div>
    </div>

    <!-- Botón -->
    <div class="acciones">
      <button class="registrar" @click="confirmarRegistro">Registrar</button>
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
        text: "Se guardará el nuevo usuario en el sistema.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFF07F",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, registrar Usuario!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Registrado con éxito!",
            text: "Usuario registrado exitosamente.",
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
.contenedor {
  max-width: 950px;
  margin: 30px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
}

h1 {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 30px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 30px 0 10px;
}

.grupo {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.campo {
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
}

input[type="text"],
select,
input[type="file"] {
  padding: 14px 18px;
  font-size: 16px;
  border: 1.6px solid #aaa;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
select:focus,
input[type="file"]:focus {
  border-color: #9e5700;
  outline: none;
}

.imagen-preview {
  margin-top: 30px;
}

.preview {
  margin-top: 10px;
  text-align: center;
}

.preview img {
  max-width: 240px;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
  background: white;
  box-shadow: 0 0 5px #ccc;
}

.acciones {
  margin-top: 40px;
  text-align: center;
}

.registrar {
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 8px #4caf50aa;
}

.registrar:hover {
  background-color: #388e3c;
  box-shadow: 0 0 12px #388e3ccc;
}

@media (max-width: 768px) {
  .grupo {
    flex-direction: column;
  }

  .campo {
    min-width: 100%;
  }

  .imagen-preview {
    text-align: center;
  }

  .preview img {
    max-width: 100%;
    aspect-ratio: 1/1;
  }

  .registrar {
    width: 100%;
  }
}
</style>