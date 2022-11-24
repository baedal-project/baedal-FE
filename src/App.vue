<template>

  <v-app>
    <v-toolbar elevation="2" color="">
      <v-toolbar-title>
        <v-btn flat class="hidden-sm-and-down" href="/">Baedal</v-btn>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="/orders">Orders</v-btn>
        <v-btn flat href="/stores">Stores</v-btn>
        <v-btn flat href="/login">Login</v-btn>
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
export default {
  name: 'App'
}
</script>
