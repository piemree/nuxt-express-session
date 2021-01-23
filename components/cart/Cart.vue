<template >
  <div class="cart-container card shadow">
    <h3 class="text-center">Sepet</h3>
    <Alert v-if="carts==0 || !carts" />

    <table v-else class="table table-hover table-striped table-bordered">
      <thead>
        <th class="text-center">Ürün Adı</th>
        <th class="text-center">Adet</th>
        <th class="text-center">Fiyat</th>
        <th class="text-center">Tutar</th>
        <th class="text-center">Sil</th>
      </thead>
      <tbody>
        <CartItems v-for="cart in carts" :key="cart.id" :cart="cart" />
      </tbody>
    </table>

    <Footer />
  </div>
</template>
<script>
import Alert from "@/components/cart/Alert";
import CartItems from "@/components/cart/CartItems";
import Footer from "@/components/cart/Footer";
export default {
  components: {
    Alert,
    CartItems,
    Footer,
  },
  computed: {
    carts() {
      return this.$store.getters.getCart;
    },
  },
};
</script>
