<template>
  <div class="StoresPage">
    <h1>Stores List</h1>
  </div>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        id
      </th>
      <th class="text-left">
        Name
      </th>
      <th class="text-left">
        address
      </th>
      <th class="text-left">
        category
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="store in stores" :key="store.storeId">
      <td class="text-left">
        {{ store.storeId }}
      </td>
      <td class="text-left">
        {{ store.name }}
      </td>
      <td class="text-left">
        {{ store.address }}
      </td>
      <td class="text-left">
        {{ store.category }}
      </td>
    </tr>
    </tbody>
  </v-table>
  <v-pagination
      v-model="page"
      :length="length"
      @click="getStoresByPage()"
      @next="nextPage"
      @previous="prevPage"
  ></v-pagination>
</template>

<script>
import axios from "axios";
import {useCookies} from "vue3-cookies";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "StoresPage",
  data() {
    return {
      stores: [],
      page: 1,
      length: 0
    };
  },
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  methods: {
    getStoresByPage() {
      axios
          .get(API_URL + "/api/stores?page=" + (this.page - 1), {
            headers: {
              "Authorization": this.cookies.get("accessToken"),
              "Refresh-Token": this.cookies.get("refreshToken")
            }
          })
          .then(response => {
            console.log(response.data);
            this.stores = response.data.data.content;
          })
          .catch(error => {
            console.log(error);
          });
    },
    nextPage() {
      this.getStoresByPage(this.page);
    },
    prevPage() {
      this.getStoresByPage(this.page);
    },

  },
  mounted() {
    axios
        .get(API_URL + "/api/stores?page=" + --this.page, {
          headers: {
            "Authorization": this.cookies.get("accessToken"),
            "Refresh-Token": this.cookies.get("refreshToken")
          }
        })
        .then(response => {
          console.log(response.data);
          this.stores = response.data.data.content;
          this.length = response.data.data.totalPages;
        })
        .catch(error => {
          console.log(error);
        })
  },
}
</script>

<style scoped>

</style>