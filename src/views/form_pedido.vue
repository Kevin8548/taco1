<template>
  <div>
    <h1>Datos para el pedido</h1>
  </div>

  <div class="formulario">
    <h2>Personales</h2>
    <br />
    <label class="texto">Nombre:</label>
    <input type="text" v-model="nombre" placeholder="Escribe tu nombre..." />
    <label class="texto">Telefono:</label>
    <input type="number" v-model="telefono" placeholder="Escribe tu telefono..." />
    <br />
    <label class="texto">Correo electronico:</label>
    <input type="text" v-model="correo" placeholder="Escribe tu correo..." />
  </div>

  <br />

  <div class="formulario">
    <h2>Dirección</h2>
    <br />
    <label class="texto">Calle:</label>
    <input type="text" v-model="calle" placeholder="Escribe tu calle..." />
    <label class="texto">Ciudad:</label>
    <input type="text" v-model="ciudad" placeholder="Escribe tu ciudad..." />
    <br />
    <label class="texto">Codigo postal:</label>
    <input type="text" v-model="cp" placeholder="Escribe tu cp..." />
    <label class="texto">Estado/provincia/zona:</label>
    <input type="text" v-model="estado" placeholder="Escribe tu estado..." />
    <br />
    <label class="texto">Entre calles:</label>
    <input type="text" v-model="calles" placeholder="Escribe las calles..." />
  </div>

  <br />

  <div class="formulario">
    <h2>Fecha de entrega</h2>
    <br />
    <label class="texto">Fecha:</label>
    <input type="date" v-model="fecha" />
    <label class="texto">Hora:</label>
    <input type="time" v-model="hora" />
  </div>
  <br />

  <div class="contenedor">
    <button @click="() => showConfirmDialog('confirmar')" class="confirmar">
      Confirmar
    </button>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";

import { useRouter } from "vue-router";
const router = useRouter();

const showConfirmDialog = (action) => {
  if (action !== "confirmar") return;

  Swal.fire({
    title: "¿Seguro que quieres confirmar el pedido?",
    text: "Estás a punto de confirmar el pedido.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Pedido confirmado",
        text: "El pedido ha sido confirmado.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/carrito");
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelado",
        text: "El pedido no fue confirmado.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  });
};
</script>

<style>
.contenedor {
  text-align: right;
  padding-bottom: 20px;
  padding-right: 30px;
}
.confirmar {
  background-color: #26ff00;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  align-items: end;
}

input[type="date"] {
  position: relative;
  z-index: 1;
}

.formulario {
  display: inline;
  flex-direction: column;
  align-items: flex-start;
}

input {
  font-size: 18px;
  padding: 7px;
  margin-bottom: 20px;
  width: 25%;
}

label {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin-right: 5px;
}

h1 {
  font-family: "roboto", sans-serif;
  align-items: center;
  padding-top: 30px;
}

h2 {
  font-family: "roboto", sans-serif;
  text-align: left;
  padding-left: 60px;
  padding-top: 15px;
}

.texto {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  text-align: left;
  margin-left: -140px;
}

/* --- RESPONSIVIDAD --- */
@media (max-width: 768px) {
  input {
    width: 90%;
  }

  .texto {
    font-size: 18px;
    margin-left: 0;
  }

  .formulario {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px;
    text-align: center;
  }

  h2 {
    font-size: 20px;
    padding-left: 20px;
  }

  .texto {
    font-size: 16px;
  }

  input {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .texto {
    margin-left: -20px;
    font-size: 18px;
  }
}
</style>
