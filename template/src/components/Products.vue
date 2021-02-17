<template>
  <div>
    <h2 class="mb-3">Tooted</h2>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(actions)="data">
        <b-button
          v-b-modal.modal-1
          variant="success"
          @click="showProducts(data.item)"
          >Vaata toote detaile</b-button
        >
      </template>
    </b-table>

    <b-modal id="modal-1" size="xl" :title="productTableTitle">
      <p class="my-4">
        <b-table striped hover :items="productItems" :fields="productFields">
          <template #cell(data)="data">
            <b>{{ data.value }}</b>
          </template>
        </b-table>
      </p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tooted",
  data() {
    return {
      fields: [
        { key: "id", label: "Toote kood"},
        { key: "type", label: "Tüüp"},
        { key: "productName", label: "Nimetus" },
        { key: "actions", label: ""}
      ],
      items: [],
      productFields: [
        { key: "description", label: "Kirjeldus" },
        { key: "colour", label: "Värv" },
        { key: "size", label: "Suurus" }, 
        { key: "sizeUnit", label: "Ühik" },
        { key: "price", label: "Hind eurodes"}
        ],
      productItems: [],
      productTableTitle: "title",
    };
  },
  async created() {
    const products = await axios({
      url: "api/products",
      method: "GET",
      headers: {},
    });
    //console.log(products);
    this.items = products.data.allProducts;

  },
  methods: {
    showProducts(item) {
      //console.log(products);
      this.productTableTitle = "Toode #" + item.id;
      this.productItems = [item];
    },
  },
};
</script>