"use strict";

import { ProductsLoader } from "./modules/product-loader.js";
import { main } from "./modules/cart-handler.js";

const productsList = document.querySelector(".products__list");
const body = document.body;

function showProducts(htmlContent) {
  productsList.innerHTML = htmlContent;
}

if (productsList) {
  let productsLoader = null;
  if (body.dataset.svPage === "home") {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      "all",
      showProducts,
      main
    );
    productsLoader.loadProducts(14);
  } else {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      "all",
      showProducts,
      main
    );
    productsLoader.loadProducts(12);
  }
} else {
  main();
}

AOS.init();
