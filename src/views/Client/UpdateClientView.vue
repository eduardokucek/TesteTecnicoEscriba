<template>
  <div class="container">
    <h2>Edite um cliente</h2>
    <form id="find-form" @submit="findClient">
      <div>
        <label for="id">Digite o ID do cliente a ser editado:</label>
        <input id="id" name="id" v-model="id" type="text" placeholder="0" />
      </div>
      <button id="btn-submit-retrieve" type="submit">Enviar</button>
    </form>
    <div class="update-container" v-if="client">
      <form id="user-form-update" @submit="updateClient">
        <div>
          <label for="name">Nome:</label>
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            :placeholder="client.nome"
            maxlength="255"
            oninvalid="this.setCustomValidity('Por favor, digite seu nome')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div>
          <label for="cpf">CPF (somente números):</label>
          <input
            id="cpf"
            name="cpf"
            v-model="cpf"
            type="text"
            :placeholder="client.cpf"
            maxlength="11"
            oninvalid="this.setCustomValidity('Por favor, digite seu CPF válido.')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div>
          <label for="birthdate">Data de nascimento:</label>
          <input id="birthdate" name="birthdate" v-model="client.dataNascimento" type="date" />
        </div>
        <button id="btn-submit-update" type="submit">Enviar</button>
      </form>
    </div>
    <div v-else></div>
    <Message :msg="msg" v-show="msg" />
  </div>
</template>

<script>
import { api } from '../../services/api.js'
import Message from '../../components/Message.vue'
import { toRaw } from 'vue'

export default {
  data() {
    return {
      id: null,
      name: null,
      cpf: null,
      birthdate: null,
      msg: this.msg,
      client: null
    }
  },
  methods: {
    async findClient(e) {
      e.preventDefault()
      const id = this.id

      await api
        .get(`/pessoas/${id}`)
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
    async updateClient(e) {
      e.preventDefault()

      toRaw(this.client)

      const data = {
        id: this.id,
        nome: this.name,
        cpf: this.cpf,
        dataNascimento: this.birthdate
      }

      if (data.nome == null && data.cpf == null && data.dataNascimento == null) {
        this.msg = 'Nenhum dado foi alterado'

        setTimeout(() => {
          this.msg = ''
          this.client = null
        }, 3000)
      } else {
        for (let key in data) {
          if (data[key] === null || data[key] === '') {
            data[key] = this.client[key]
          }
        }

        api
          .patch(`/pessoas/${data.id}`, data)
          .then((this.msg = 'Cliente atualizado com sucesso!'))
          .catch(
            (error) => (
              (this.client = null),
              (this.id = ''),
              (this.msg = 'Falha ao atualizar o cliente'),
              console.log(error)
            )
          )

        setTimeout(() => {
          this.client = null
          this.msg = ''
        }, 3000)
      }
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

.container #find-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.container #find-form label {
  margin-right: 0.6rem;
}

.container #find-form input {
  height: 22px;
  border: none;
  border-radius: 6px;
  padding-left: 0.4rem;
}

.container #find-form button {
  height: 32px;
  width: 80px;
  color: rgb(85, 85, 85);
  background: rgba(249, 148, 23);
  border: none;
  border-radius: 6px;
}

.container .update-container #user-form-update {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container .update-container #user-form-update label {
  margin-right: 0.6rem;
}

.container .update-container #user-form-update input {
  height: 22px;
  border: none;
  border-radius: 6px;
  padding-left: 0.4rem;
}

.container .update-container #user-form-update button {
  height: 32px;
  width: 80px;
  color: rgb(85, 85, 85);
  background: rgba(249, 148, 23);
  border: none;
  border-radius: 6px;
}
</style>
