<template>
  <div class="container">
    <h2>Encontre um cliente</h2>
    <form id="user-form" @submit="retrieveClient">
      <div>
        <label for="id">Digite o ID do cliente a ser encontrado:</label>
        <input id="id" name="id" v-model="id" type="text" placeholder="0" />
      </div>
      <button id="btn-submit" type="submit">Enviar</button>
    </form>
    <Message :msg="msg" v-show="msg" />
    <div v-if="client" id="found-client">
      <p>{{ client.nome }}</p>
      <span>{{ client.cpf }}</span>
      <span>{{ client.dataNascimento }}</span>
      <button id="btn-delete" type="button" v-on:click="deleteClient(client.id)">Deletar</button>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { api } from '../../services/api.js'
import Message from '../../components/Message.vue'
export default {
  name: 'RetrieveClientView',
  data() {
    return {
      id: null,
      client: null,
      msg: this.msg
    }
  },
  methods: {
    async retrieveClient(e) {
      e.preventDefault()
      const data = {
        id: this.id
      }
      await api
        .get(`/pessoas/${data.id}`)
        .then((response) => ((this.msg = ''), (this.id = ''), (this.client = response.data)))
        .catch((error) =>
          console.log(
            error,
            ((this.client = null), (this.id = ''), (this.msg = 'Usuário não encontrado'))
          )
        )
      setTimeout(() => {
        this.msg = ''
      }, 3000)
    },
    async deleteClient(id) {
      await api
        .delete(`/pessoas/${id}`)
        .then(
          (response) => (
            (this.msg = 'Cliente deletado com sucesso'),
            (this.color = 'red'),
            (this.client = null),
            console.log(response)
          )
        )
        .catch((error) =>
          console.log(error, (console.log(error), (this.msg = 'Cliente não encontrado')))
        )

      this.id = ''

      setTimeout(() => {
        this.msg = ''
      }, 3000)
    },
    toUpdate(id) {
      this.$router.push({ name: 'update', params: { data: id } })
    }
  },
  components: { Message }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.container #user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container #user-form label {
  margin-right: 0.6rem;
}

.container #user-form input {
  height: 22px;
  border: none;
  border-radius: 6px;
  padding-left: 0.4rem;
}

.container #user-form button {
  height: 32px;
  width: 80px;
  color: rgb(85, 85, 85);
  background: rgba(249, 148, 23);
  border: none;
  border-radius: 6px;
}

#found-client {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.6rem;
}

#found-client * {
  width: 100%;
}

#found-client button {
  height: 32px;
  width: 90px;
  color: rgb(85, 85, 85);
  background: rgba(249, 148, 23);
  border: none;
  border-radius: 6px;
}
</style>
