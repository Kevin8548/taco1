import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/inicio.vue'
import Carrito from '../views/carrito.vue'
import Cotizar from '../views/cotizar.vue'
import Editar_Taco from '../views/edit_taco.vue'
import Editar_Usuario from '../views/edit_usuario.vue'
import Editar_Local from '../views/edit_local.vue'
import EstadoPedidos from '../views/estado.vue'
import FormPedido from '../views/form_pedido.vue'
import Inicio_Sesion from '../views/inicio_sesion.vue'
import Locales from '../views/locales.vue'
import Pedidos from '../views/pedidos.vue'
import Perfil from '../views/perfil.vue'
import Registrar_Taco from '../views/reg_taco.vue'
import Registrar_Usuario from '../views/reg_usuario.vue'
import Registrar_Local from '../views/reg_local.vue'
import Registro from '../views/registro.vue'
import Sabores from '../views/sabores.vue'
import Usuario from '../views/usuario.vue'
import comentarios from '../views/comentarios.vue'
import tabla_pedidos from '../views/tabla_pedidos.vue'
import EditarInicio from '../views/editar_inicio.vue'
import Pago from '../views/pago.vue'

const routes = [
  // Ruta raíz: redirige a /inicio
  { path: '/', redirect: '/inicio' },

  // Pantalla de pago
  {
    path: '/pago',
    name: 'Pago',
    component: Pago,
    props: route => ({
      order: route.query.order
        ? JSON.parse(route.query.order)
        : null
    })
  },

  // Otras rutas
  { path: '/inicio', component: Inicio },
  { path: '/carrito', component: Carrito },
  { path: '/cotizar', component: Cotizar },
  { path: '/sabores', component: Sabores },
  { path: '/editar-taco/:id', component: Editar_Taco, props: true },
  { path: '/editar-usuario/:id', component: Editar_Usuario, props: true },
  { path: '/editar-local/:id', component: Editar_Local, props: true },
  { path: '/estado', component: EstadoPedidos },
  { path: '/', redirect: '/form_pedido' },

  { 
    path: '/form_pedido', 
    name: 'FormPedido', 
    component: FormPedido 
  },
  { path: '/inicio_sesion', component: Inicio_Sesion },
  { path: '/locales', component: Locales },
  { path: '/pedidos', component: Pedidos },
  { path: '/perfil', component: Perfil },
  { path: '/registrar_taco', component: Registrar_Taco },
  { path: '/registrar_usuario', component: Registrar_Usuario },
  { path: '/registrar_local', component: Registrar_Local },
  { path: '/registro', component: Registro },
  { path: '/usuario', component: Usuario },
  {
    path: '/locales/:id/comentarios',
    name: 'Comentarios',
    component: comentarios,
    props: route => ({ localId: Number(route.params.id) })
  },
  { path: '/tabla_pedidos', component: tabla_pedidos },
  { path: '/editar-inicio', component: EditarInicio }
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes,
})

export default router
