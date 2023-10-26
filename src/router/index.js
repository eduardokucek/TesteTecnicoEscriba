import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateClientView from '../views/Client/CreateClientView.vue'
import ListClientView from '../views/Client/ListClientsView.vue'
import RetrieveClientView from '../views/Client/RetrieveClientView.vue'
import UpdateClientView from '../views/Client/UpdateClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/client',
      name: 'client',
      component: CreateClientView
    },
    {
      path: '/list',
      name: 'list',
      component: ListClientView
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: RetrieveClientView
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateClientView
    }
  ]
})

export default router
