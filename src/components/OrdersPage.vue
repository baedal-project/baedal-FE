<template>
  <div class="OrdersPage">
    <h1>Orders List</h1>
  </div>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        ordersId
      </th>
      <th class="text-left">
        orderDate
      </th>
      <th class="text-left">
        memberId
      </th>
      <th class="text-left">
        상세조회
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.ordersId">
      <td class="text-left">
        {{ order.ordersId }}
      </td>
      <td class="text-left">
        {{ order.orderDate }}
      </td>
      <td class="text-left">
        {{ order.memberId }}
      </td>
      <td class="text-left">
        <v-btn color="white" dark class="mb-2" @click="getOrderDetail(order.ordersId)">상세조회</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <v-pagination
      v-model="page"
      :length="length"
      @click="getOrdersByPage()"
      @next="nextPage"
      @previous="prevPage"
  ></v-pagination>
  <v-row>
    <v-dialog
        v-model="dialog"
        persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="cyan"
            v-bind="props"
        >
          주문하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">주문하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="order.storeId"
                    label="Store ID"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="order.memberId"
                    label="Member ID"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                    v-model="order.itemId"
                    multiple
                    :items="itemId"
                    label="itemId"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                    v-model="order.amount"
                    multiple
                    :items="amount"
                    label="amount"
                ></v-select>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addOrder"
          >
            주문하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row
      justify="center">
    <v-dialog v-model="orderDialog"
              persistent
              max-width="900">
      <v-card>
        <v-card-title class="headline">주문 상세</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                OrderId: {{ orderDetail.ordersId }}
              </v-col>
              <v-col cols="12" sm="6" md="4">
                OrderDate: {{ orderDetail.orderDate }}
              </v-col>
              <v-col cols="12" sm="6" md="4">
                memberId: {{ orderDetail.memberId }}
              </v-col>
            </v-row>
            <v-row>
              <v-table>
                <thead>
                <tr>
                  <th class="text-left">
                    itemId
                  </th>
                  <th class="text-left">
                    amount
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in orderDetail.orderHasItems" :key="item.itemId">
                  <td class="text-left">
                    {{ item.itemName }}
                  </td>
                  <td class="text-left">
                    {{ item.amount }}
                  </td>
                </tr>
                </tbody>
              </v-table>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="orderDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "OrdersPage",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data: () => ({
    dialog: false,
    orderDialog: false,
    order: {
      storeId: '',
      memberId: '',
      itemId: [],
      amount: []
    },
    orders: [],
    api_version: '',
    page: 1,
    length: 0,
    itemId: [1, 2, 3],
    amount: [1, 2, 3],
    orderDetail: {
      ordersId: '',
      orderDate: '',
      orderHasItems: [],
      memberId: '',
    }
  }),
  methods: {
    getOrdersByPage() {
      axios
          .get(API_URL + "/api/v2/orders?page=" + (this.page - 1), {
            headers: {
              "Authorization": this.cookies.get("accessToken"),
              "Refresh-Token": this.cookies.get("refreshToken")
            }
          })
          .then(response => {
            console.log(response);
            this.orders = response.data.data[0];
          })
          .catch(error => {
            console.log(error);
          });
    },
    nextPage() {
      this.getOrdersByPage(this.page);
    },
    prevPage() {
      this.getOrdersByPage(this.page);
    },
    addOrder() {
      axios
          .post(API_URL + "/api/orders", this.order,  {
            headers: {
              "Authorization": this.cookies.get("accessToken"),
              "Refresh-Token": this.cookies.get("refreshToken")
            }
          })
          .then(response => {
            console.log(response.data);
            this.orders = response.data.data.content;
          })
          .catch(error => {
            console.log(error);
          });
    },
    getOrderDetail(orderId) {
      axios
          .get(API_URL + "/api/orders/" + orderId,  {
            headers: {
              "Authorization": this.cookies.get("accessToken"),
              "Refresh-Token": this.cookies.get("refreshToken")
            }
          })
          .then(response => {
            console.log(response);
            this.orderDetail = response.data.data;
            this.orderDialog = true;
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  mounted() {
    axios
        .get(API_URL + "/api/v2/orders?page=" + --this.page,  {
          headers: {
            "Authorization": this.cookies.get("accessToken"),
            "Refresh-Token": this.cookies.get("refreshToken")
          }
        })
        .then(response => {
          console.log(response.data);
          this.orders = response.data.data[0];
          this.length = response.data.data[1].pages;
        })
        .catch(error => {
          console.log(error);
        })
  },
}
</script>

<style scoped>

</style>