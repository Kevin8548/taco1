<template>
  <div class="usuarios">
    <header class="encabezado">
      <h1>Usuarios</h1>
      <div class="busqueda">
        <input v-model="search" placeholder="Buscar usuario..." />
        <button>Buscar</button>
      </div>
    </header>

    <section class="tarjetas">
      <div
        v-for="(usuario, index) in usuariosFiltrados"
        :key="index"
        class="tarjeta"
        :class="index % 2 === 0 ? 'naranja' : 'amarilla'"
      >
        <span class="avatar">👤</span>
        <div class="contenido">
          <p><strong>{{ usuario.nombre }}</strong></p>
          <p>{{ usuario.email }}</p>
          <p>{{ usuario.telefono }}</p>
          <p>{{ usuario.ubicacion }}</p>
          <p>{{ usuario.rol }}</p>
        </div>
        <div class="boton-container">
          <button @click="editar(usuario)">Editar</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      usuarios: [
        { nombre: "Juan", email: "juan@perez", telefono: "23045996", ubicacion: "Tlaxcala", rol: "Vendedor" },
        { nombre: "Ana", email: "ana@gmail.com", telefono: "23123456", ubicacion: "Apizaco", rol: "Administrador" },
        { nombre: "Luis", email: "luis@hotmail.com", telefono: "22114566", ubicacion: "Huamantla", rol: "Cliente" },
        { nombre: "María", email: "maria@live.com", telefono: "22118976", ubicacion: "Chiautempan", rol: "Vendedor" },
        { nombre: "Pedro", email: "pedro@yahoo.com", telefono: "22119876", ubicacion: "Zacatelco", rol: "Administrador" },
        { nombre: "Sofía", email: "sofia@mail.com", telefono: "22112345", ubicacion: "Tlaxco", rol: "Cliente" },
        { nombre: "Carlos", email: "carlos@correo.com", telefono: "22116789", ubicacion: "Teolocholco", rol: "Vendedor" },
        { nombre: "Laura", email: "laura@empresa.com", telefono: "22119987", ubicacion: "Panotla", rol: "Administrador" },
      ],
    };
  },
  computed: {
    usuariosFiltrados() {
      const texto = this.search.toLowerCase();
      return this.usuarios.filter(
        (u) =>
          u.nombre.toLowerCase().includes(texto) ||
          u.email.toLowerCase().includes(texto)
      );
    },
  },
  methods: {
    editar(usuario) {
      this.$router.push('/editar_usuario');
    },
  },
};
</script>

<style scoped>
.usuarios {
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.encabezado {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.busqueda {
  display: flex;
  background: white;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
}

.busqueda input {
  flex-grow: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  outline: none;
}

.busqueda button {
  background: #81c81e;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
}

.tarjetas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 220px;
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-size: 14px;
  background-color: #fff;
  overflow: hidden;
  word-break: break-word;
}

.avatar {
  font-size: 26px;
  margin-bottom: 8px;
}

.contenido {
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contenido p {
  margin: 4px 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.boton-container {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.boton-container button {
  background: #a44e00;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.naranja {
  background: #ffb97a;
}

.amarilla {
  background: #fff386;
}

/* Responsive para tabletas y móviles */
@media (max-width: 1024px) {
  .tarjetas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .tarjetas {
    grid-template-columns: 1fr;
  }

  .encabezado {
    flex-direction: column;
    align-items: stretch;
  }

  .busqueda {
    width: 100%;
  }
}
</style>