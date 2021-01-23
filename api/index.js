const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(session({ secret: "ssshhhhh" }));
app.use(bodyParser.json());

const testProducts = [
  { id: 1, title: "elma peyniri", price: 51 },
  { id: 2, title: "kelek peyniri", price: 531 },
  { id: 3, title: "şeftali peyniri", price: 71 }
];

app.get("/", (req, res) => {
  let cart = [];
  if (req.session.cart) {
    cart = req.session.cart;
  }
  let totalPrice = 0;

  if (req.session.totalPrice) {
    totalPrice = req.session.totalPrice;
  }

  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res.status(200).json({ testProducts, cart: cart, totalPrice: totalPrice });
});

app.post("/add-to-cart", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  if (cart.length > 0) {
    let same = cart.find(products => {
      return products.id == product.id;
    });

    if (same) {
      same.count += product.count;
      same.totalPrice = same.count * same.price;
    } else {
      cart.push({ ...product, totalPrice: product.count * product.price });
    }
  } else {
    cart.push({ ...product, totalPrice: product.count * product.price });
  }

  req.session.cart = cart;

  let totalPrice = 0;
  if (req.session.totalPrice) {
    totalPrice = req.session.totalPrice;
  }
  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});

app.post("/chance-count", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  if (cart.length > 0) {
    let same = cart.find(products => {
      return products.id == product.id;
    });

    if (same) {
      same.count = product.count;
      same.totalPrice = same.count * same.price;
    }
  }

  req.session.cart = cart;

  let totalPrice = 0;
  if (req.session.totalPrice) {
    totalPrice = req.session.totalPrice;
  }
  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});

app.post("/remove-to-cart", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  let index = cart.findIndex(products => products.id === product.id);

  if (index>-1) {
    cart.splice(index, 1);
  }

  req.session.cart = cart;

  let totalPrice = 0;
  if (req.session.totalPrice) {
    totalPrice = req.session.totalPrice;
  }
  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});
module.exports = {
  path: "/api",
  handler: app
};
