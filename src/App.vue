<template>

  <v-app>
    <v-toolbar elevation="2" color="">
      <v-toolbar-title>
        <v-btn flat class="hidden-sm-and-down" href="/">Baedal</v-btn>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="/orders">Orders</v-btn>
        <v-btn flat href="/stores">Stores</v-btn>
        <v-btn v-if="this.cookies.get('accessToken') == null" flat href="/login">Login</v-btn>
        <v-btn v-if="this.cookies.get('accessToken') != null" flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  name: 'App',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  created() {
    if (this.cookies.get('accessToken') == null) {
      this.$router.push('/login');
    } else {
      this.$router.push('/stores');

    }
  },
  methods: {
    logout() {
      this.cookies.remove('accessToken');
      this.cookies.remove('refreshToken');
      this.$router.go('/login');
    }
  }
}
</script>
