import { createRouter, createWebHistory } from 'vue-router';
import PaginaProdutos from '../views/PaginaProdutos.vue';
import PaginaCategorias from '../views/PaginaCategorias.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/produtos'
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: PaginaProdutos
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: PaginaCategorias
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;