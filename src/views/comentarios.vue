<!-- src/views/ComentariosView.vue -->
<template>
  <div class="comentarios-container">
    <h2>Comentarios para "{{ localNombre }}"</h2>

    <div class="nuevo-comentario">
      <input
        v-model="nuevo.texto"
        placeholder="Escribe tu comentario…"
      />
      <div class="estrellas">
        <span
          v-for="i in 5"
          :key="i"
          class="estrella"
          :class="{ activa: i <= nuevo.calificacion }"
          @click="nuevo.calificacion = i"
        >★</span>
      </div>
      <button @click="agregarComentario">
        Agregar comentario
      </button>
    </div>

    <div class="lista-comentarios">
      <div
        v-for="c in comentarios"
        :key="c.id"
        class="comentario"
      >
        <p>{{ c.texto }}</p>
        <div class="estrellas">
          <span
            v-for="i in 5"
            :key="i"
            class="estrella"
            :class="{ activa: i <= c.calificacion }"
          >★</span>
        </div>
        <button
          v-if="currentUser.role === 'admin'"
          class="eliminar"
          @click="eliminarComentario(c.id)"
        >🗑</button>
      </div>
      <p v-if="!comentarios.length" class="vacio">
        No hay comentarios aún.
      </p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ComentariosView',
  props: {
    localId: { type: Number, required: true }
  },
  data() {
    return {
      localNombre: '',
      nuevo: {
        texto: '',
        calificacion: 0
      },
      comentarios: [],
      currentUser: JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      )
    }
  },
  methods: {
    // 1) Intenta traer el nombre del local directamente
    async fetchLocal() {
      try {
        const res = await fetch(`/api/locales/${this.localId}`)
        if (!res.ok) throw new Error(res.statusText)
        const local = await res.json()
        this.localNombre = local.nombre
      } catch {
        // Deja localNombre en vacío; se completará desde comentarios
      }
    },

    // 2) Trae los comentarios y completa el nombre si falta
    async fetchComentarios() {
      try {
        const res = await fetch(
          `/api/locales/${this.localId}/comentarios`
        )
        if (!res.ok) throw new Error(res.statusText)
        const json = await res.json()
        this.comentarios = json

        // Si no se cargó el nombre del local, lo tomamos del primer comentario
        if (!this.localNombre && json.length && json[0].local_nombre) {
          this.localNombre = json[0].local_nombre
        }
      } catch (err) {
        console.error('Error cargando comentarios:', err)
      }
    },

    // Agrega un nuevo comentario
    async agregarComentario() {
      if (!this.nuevo.texto.trim()) {
        return Swal.fire(
          'Atención',
          'Escribe tu comentario.',
          'warning'
        )
      }
      try {
        const res = await fetch(
          `/api/locales/${this.localId}/comentarios`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.nuevo)
          }
        )
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'No se pudo enviar comentario')
        }
        const comentario = await res.json()
        // Si el nuevo comentario trae local_nombre, lo usamos
        if (comentario.local_nombre && !this.localNombre) {
          this.localNombre = comentario.local_nombre
        }
        this.comentarios.unshift(comentario)
        this.nuevo.texto = ''
        this.nuevo.calificacion = 0
      } catch (err) {
        console.error('Error agregando comentario:', err)
        Swal.fire('Error', err.message, 'error')
      }
    },

    // Elimina un comentario (sólo admin)
    async eliminarComentario(id) {
      const confirm = await Swal.fire({
        title: '¿Eliminar comentario?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })
      if (!confirm.isConfirmed) return

      try {
        const res = await fetch(`/api/comentarios/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': this.currentUser.id,
            'X-User-Role': this.currentUser.role
          }
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'No se pudo eliminar comentario')
        }
        this.comentarios = this.comentarios.filter(
          c => c.id !== id
        )
        Swal.fire(
          'Eliminado',
          'El comentario fue eliminado.',
          'success'
        )
      } catch (err) {
        console.error('Error borrando comentario:', err)
        Swal.fire('Error', err.message, 'error')
      }
    }
  },
  // Al montar, primero nombre, luego comentarios
  async mounted() {
    await this.fetchLocal()
    await this.fetchComentarios()
  }
}
</script>
<style scoped>
.comentarios-container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}
.nuevo-comentario { margin-bottom: 2rem; }
input {
  width: 100%;
  padding: 8px;
  margin: .5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
button {
  padding: 8px 16px;
  background: #ffaa00;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: .5rem;
}
button:hover { background: #e69500; }
.estrellas {
  display: flex;
  gap: 4px;
  margin: .5rem 0;
}
.estrella {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: color .2s;
}
.estrella.activa { color: #f5a623; }
.lista-comentarios .comentario {
  margin-bottom: 1rem;
  padding: .5rem;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 6px;
}
.eliminar {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #c00;
  margin-left: 8px;
}
.eliminar:hover { color: #900; }
</style>