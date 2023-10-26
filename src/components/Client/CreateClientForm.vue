<template>
  <div class="container">
    <form id="user-form" @submit="createClient">
      <div>
        <label for="name">Nome:</label>
        <input
          id="name"
          name="name"
          v-model="name"
          type="text"
          placeholder="Digite seu nome"
          minlength="4"
          maxlength="255"
          required
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
          placeholder="Digite seu CPF"
          maxlength="11"
          required
          oninvalid="this.setCustomValidity('Por favor, digite seu CPF válido.')"
          oninput="this.setCustomValidity('')"
        />
      </div>
      <div>
        <label for="birthdate">Data de nascimento:</label>
        <input id="birthdate" name="birthdate" v-model="birthdate" type="date" />
      </div>
      <button id="btn-submit" type="submit">Enviar</button>
    </form>
    <Message :msg="msg" v-show="msg" />
  </div>
</template>

<script>
import { api } from '../../services/api.js'
import Message from '../Message.vue'

export default {
  name: 'CreateClientForm',
  data() {
    return {
      name: null,
      cpf: null,
      birthdate: null,
      msg: this.msg
    }
  },
  methods: {
    async createClient(e) {
      e.preventDefault()

      const data = {
        nome: this.name,
        cpf: parseInt(this.cpf),
        dataNascimento: this.birthdate
      }

      if (this.cpf.length < 11 || typeof data.cpf != 'number' || isNaN(data.cpf)) {
        this.msg = 'Por favor, digite um CPF válido.'

        this.cpf = ''

        setTimeout(() => {
          this.msg = ''
        }, 3000)
      } else {
        await api
          .post('/pessoas', data)
          .then(
            (response) => ((this.msg = 'Cliente cadastrado com sucesso'), console.log(response))
          )
          .catch((error) => console.log(error))

        this.name = ''
        this.cpf = ''
        this.birthdate = ''

        setTimeout(() => {
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
</style>
