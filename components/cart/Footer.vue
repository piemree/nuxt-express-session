<template>
  <div class="cart-footer mt-auto">
    <div
      class="total-price d-flex justify-content-end align-items-center rounded-0"
    >
      <strong style="font-size: 18px">Toplam Tutar : </strong>
      <span class="badge total-price-container rounded-0">{{totalPrice}}₺</span>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    totalPrice(){
      return this.$store.getters.gettotalPrice
    }
  }
}
</script>