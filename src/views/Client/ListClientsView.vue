<template>
  <div class="container">
    <h2>Listando os clientes...</h2>
    <ul>
      <li v-for="client in clients" :key="client.id">
        <p>{{ client.nome }}</p>
        <span>{{ client.cpf }}</span>
        <span>{{ client.dataNascimento }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { api } from '../../services/api.js'
export default {
  name: 'ListClientsForm',
  data() {
    return {
      clients: null
    }
  },
  methods: {
    async listClients() {
      api
        .get('/pessoas')
        .then((response) => (this.clients = response.data))
        .catch((error) => console.log(error))
    }
  },
  mounted() {
    this.listClients()
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 500px;
}

.container ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  list-style-type: none;
}

.container ul li {
  display: flex;
  align-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
