<template>
  <div class="LoginPage">
    <h1>Login</h1>
    <p>
      This is the login page.
    </p>
  </div>
  <v-form>
    <v-text-field
        v-model="id"
        label="ID"
        required
    ></v-text-field>
    <v-text-field
        v-model="password"
        label="Password"
        required
    ></v-text-field>
    <v-btn color="white" dark class="mb-2" @click="login()">로그인</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "LoginPage",
  accessToken: null,
  refreshToken: null,
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      nickname: '',
      password: '',
      role: 'CONSUMER'
    }
  },
  methods: {
    login() {
      axios.post( API_URL+ "/api/members/login" , {
        nickname: this.id,
        password: this.password,
        role: this.role
      }).then((response) => {
        console.log(response.data)
        console.log(response.headers)
        if (response.data.success) {
          this.cookies.set('accessToken', response.headers.get('authorization'), response.headers.get('authorization').expiresIn);
          this.cookies.set('refreshToken', response.headers.get('refresh-token'), response.headers.get('refresh-token').expiresIn);
          this.$router.push('/stores');
        } else {
          alert('로그인 실패');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>