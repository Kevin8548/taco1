<template>
  <div>
    <div class="conteiner">
      <div class="page-wrapper">
        <div class="card">
          <div class="image-container">
            <img src="../assets/img/taco.png" alt="inicio" class="inicio" />
          </div>

          <div class="form-container">
            <h2 class="title">Inicio de sesión</h2>

            <label class="label" for="correo_electronico">Correo electrónico</label>
            <input
              id="correo_electronico"
              v-model="correo_electronico"
              type="email"
              placeholder="Correo electrónico"
              class="input"
            />

            <label class="label" for="contrasena">Contraseña</label>
            <input
              id="contrasena"
              v-model="contrasena"
              type="password"
              placeholder="Contraseña"
              class="input"
            />

            <button class="button primary" @click="login()">Ingresar</button>

            <div class="divider">
              <div class="line"></div>
              <span class="or-text">o</span>
              <div class="line"></div>
            </div>

            <router-link to="/reg_usuario" class="button secondary">
              Registrarse
            </router-link>

            <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      correo_electronico: "",
      contrasena: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo_electronico: this.correo_electronico,
            contrasena: this.contrasena,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // 1. Guardar usuario en localStorage
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: data.userId,
              role: data.role,
              nombre: data.nombre,
            })
          );

          // 2. Determinar destino (redirect o perfil)
          const destino = this.$route.query.redirect
            ? this.$route.query.redirect
            : { name: "Perfil", params: { id: data.userId } };

          // 3. Navegar y recargar para actualizar la Navbar
          this.$router
            .push(destino)
            .then(() => window.location.reload())
            .catch((err) =>
              console.error("Error durante la navegación:", err)
            );
        } else {
          this.errorMessage = data.message || "Error al iniciar sesión";
        }
      } catch (error) {
        this.errorMessage = "Error de red o del servidor";
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}
.card {
  display: flex;
  flex-wrap: wrap;
  max-width: 80rem;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 50px;
}
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 100px; /* Ajusta esto para bajar más o menos */
  background-color: #f0fdf4;
}

.image-container {
  width: 50%; /* más estrecho que 50% */
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inicio {
  max-width: 1000px; /* más razonable que 10px */
  width: 150%;
  height: auto;
  object-fit: contain;
}

.form-container {
  width: 50%;
  background-color: #edba52;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  color: rgb(14, 14, 14);
  margin-bottom: 1.5rem;
  text-align: center;
}

.label {
  font-size: 0.875rem;
  color: rgb(2, 2, 2);
  margin-bottom: 0.25rem;
}

.input {
  padding: 0.75rem;
  border-radius: 9999px;
  width: 100%;
  margin-bottom: 1rem;
  border: none;
  outline: none;
}

.input::placeholder {
  color: #c1c2be;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
  border: none;
  cursor: pointer;
}
.primary {
  background-color: #eb8825;
  color: rgb(14, 14, 14);
  text-align: center;
  text-decoration: none;
}

.primary:hover {
  background-color: #3b5c69;
}
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
  border: none;
  cursor: pointer;
}
.secondary {
  background-color: rgb(148, 97, 10);
  color: rgb(14, 14, 14);
  text-align: center;
  text-decoration: none;
}

.secondary:hover {
  background-color: #3b5c69;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.line {
  border-top: 1px solid #080808;
  width: 33%;
}

.or-text {
  margin: 0 0.5rem;
  font-size: 0.875rem;
  color: #090909;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }

  .image-container,
  .form-container {
    width: 100%;
  }

  .image-container {
    height: 200px;
  }
}
</style>