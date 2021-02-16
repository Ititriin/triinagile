<template>
  <div>
    <h2 class="mb-3">Tellimused</h2>

    <b-table striped hover :items="items" :fields="fields">
      <template #cell(totalPrice)="data"
        ><b class="text-info">{{ data.value }} EUR</b></template
      >

      <template #cell(actions)="data">
        <b-button
          v-b-modal.modal-1
          variant="success"
          @click="showProducts(data.item.products, data.item)"
          >Vaata tellimust</b-button
        >
      </template>
    </b-table>

    <b-modal id="modal-1" size="xl" :title="productTableTitle">
      <p class="my-4">
        <b-table striped hover :items="productItems" :fields="productFields">
          <template #cell(totalPrice)="data"
            ><b class="text-info">{{ data.value }} EUR</b></template
          >
        </b-table>
      </p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Orders",
  data() {
    return {
      fields: [
        { key: "orderID", label: "Tellimuse number" },
        { key: "orderStatus", label: "Staatus" },
        { key: "client.firstName", label: "Eesnimi" },
        { key: "client.lastName", label: "Perenimi" },
        { key: "deliveryMethod", label: "Kohaletoimetuse viis" },
        { key: "actions", label: "" }
      ],
      items: [],
      productFields: [
        { key: "productName", label: "Toote nimetus"},
        { key: "quantity", label: "Kogus"},
        { key: "price", label: "Hind"},
        { key: "totalPrice", label: "Kogusumma"}
        ],
      productItems: [],
      productTableTitle: "title",
    };
  },
  async created() {
    const orders = await axios({
      url: "api/orders",
      method: "GET",
      headers: {},
    });

    this.items = orders.data.allOrders;
  },
  methods: {
    showProducts(products, item) {
      console.log(products);
      this.productItems = products;
      console.log(item);
      this.productTableTitle = "Tellimus #" + item.orderID;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
