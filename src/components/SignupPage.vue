<template>

  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="nickname"
              label="ID"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="password"
              label="Password"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="name"
              label="Name"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="address"
              label="Address"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-radio-group v-model="role" row>
            <v-radio label="Consumer" value="CONSUMER"></v-radio>
            <v-radio label="Store" value="PRODUCER"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="white" dark class="mb-2" @click="signup()">회원가입</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "SignupPage",
  data() {
    return {
      nickname: '',
      password: '',
      name: '',
      address: '',
      role: ''
    }
  },
  methods: {
    signup() {
      axios.post(API_URL + '/api/members/signup', {
        nickname: this.nickname,
        password: this.password,
        name: this.name,
        address: this.address,
        role: this.role
      })
          .then(response => {
            console.log(response)
            this.$router.push('/login')
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>

</style>