"use strict";

import { ProductsLoader } from "./modules/product-loader.js";
import { main } from "./cart-handler.js";

const productsList = document.querySelector(".products__list");

function showProducts(htmlContent) {
  productsList.innerHTML = htmlContent;
}

const productsLoader = new ProductsLoader(
  "../data/products.json",
  showProducts,
  main
);
productsLoader.loadProducts();
