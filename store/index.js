export const state = () => ({
  products: [],
  carts: [],
  totalPrice: 0.0
});
export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setCart(state, cart) {
    state.carts = cart;
  },
  settotalPrice(state, totalPrice) {
    state.totalPrice = totalPrice;
  }
};
export const actions = {
  nuxtServerInit(vuexContex, context) {
    return context.$axios.get("/").then(response => {
      vuexContex.commit("setProducts", response.data.testProducts);
      vuexContex.commit("setCart", response.data.cart);
      vuexContex.commit("settotalPrice", response.data.totalPrice);
    });
  },
  addToCart(vuexContex, product) {
    this.$axios.post("/add-to-cart", { product: product }).then(response => {
      vuexContex.commit("setCart", response.data.cart.items);
      vuexContex.commit("settotalPrice", response.data.totalPrice);
     
    });
  },
  removeProduct(vuexContex, product) {

    this.$axios.post("/remove-to-cart", { product: product }).then(response => {
      vuexContex.commit("setCart", response.data.cart.items);
      vuexContex.commit("settotalPrice", response.data.totalPrice);
    });

  },
  chanceCount(vuexContex, product) {
    this.$axios.post("/chance-count", { product: product }).then(response => {
      vuexContex.commit("setCart", response.data.cart.items);
      vuexContex.commit("settotalPrice", response.data.totalPrice);
    })
  }
};
export const getters = {
  getProducts(state) {
    return state.products;
  },

  getCart(state){
    return state.carts;
  },
  gettotalPrice(state){
    return state.totalPrice;
  }
};
