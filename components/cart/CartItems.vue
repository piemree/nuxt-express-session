<template >
  <tr class="bg-custom-color">
    <td class="p-2">{{ cart.title }}</td>
    <td class="p-2 text-center w-25">
      <div class="d-flex flex-row justify-content-center p-0 m-0">
        <button
          @click="chanceCount(-1)"
          class="btn btn-sm btn-outline-danger rounded-0"
        >
          -
        </button>
        <input
          disabled
          type="text"
          class="form-control form-control-sm w-25 text-center rounded-0 border-left-0 border-right-0"
          v-model="product_count"
        />
        <button
          @click="chanceCount(+1)"
          class="btn btn-sm btn-outline-success rounded-0"
        >
          +
        </button>
      </div>
    </td>
    <td class="p-2 text-center">{{ cart.price }}₺</td>
    <td class="p-2 text-center">{{ cart.price * cart.count }}₺</td>
    <td class="p-2 text-center">
      <button @click="removeProduct" class="btn btn-sm btn-danger">Sil</button>
    </td>
  </tr>
</template>
<script>
export default {
  computed: {
    product_count() {
      return this.cart.count;
    },
  },
  props: {
    cart: {
      type: Object,
    },
  },
  methods: {
    chanceCount(value) {
      this.cart.count += value;
      if (this.cart.count == 0) {
        this.$store.dispatch("removeProduct", this.cart);
      }
      this.$store.dispatch("chanceCount", this.cart);
    },
      removeProduct() {
      this.$store.dispatch("removeProduct", this.cart);
    },
  },
};
</script>
