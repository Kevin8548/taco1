import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/inicio.vue'
import Carrito from '../views/carrito.vue'
import Cotizar from '../views/cotizar.vue'
import Editar_Taco from '../views/edit_taco.vue'
import Editar_Usuario from '../views/edit_usuario.vue'
import Editar_Local from '../views/edit_local.vue'
import Estado from '../views/estado.vue'
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

const routes = [
  { path: '/inicio', component: Inicio },
  { path: '/carrito', component: Carrito },
  { path: '/cotizar', component: Cotizar },
  { path: '/sabores', component: Sabores },
  { path: '/editar_taco', component: Editar_Taco },
  { path: '/editar_usuario', component: Editar_Usuario },
  { path: '/editar_local', component: Editar_Local },
  { path: '/estado', component: Estado },
  { path: '/form_pedido', component: FormPedido },
  { path: '/inicio_sesion', component: Inicio_Sesion },
  { path: '/locales', component: Locales },
  { path: '/pedidos', component: Pedidos },
  { path: '/perfil', component: Perfil },
  { path: '/registrar_taco', component: Registrar_Taco },
  { path: '/registrar_usuario', component: Registrar_Usuario },
  { path: '/registrar_local', component: Registrar_Local },
  { path: '/registro', component: Registro },
  { path: '/usuario', component: Usuario },
  { path: '/comentarios', component: comentarios },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
