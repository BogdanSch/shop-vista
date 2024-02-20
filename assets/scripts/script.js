"use strict";

import { ProductsLoader } from "./product-loader.js";
import { Cart } from "./cart.js";

const productsList = document.querySelector(".products__list");
const cartProductsList = document.querySelector(
  ".header__cart__list .items-list"
);
const totalPriceLabel = document.querySelector(".items-total-price");

const clearCartButton = document.querySelector("#clearCartButton");

function showProducts(htmlContent) {
  productsList.innerHTML = htmlContent;
}

const productsLoader = new ProductsLoader(
  "../data/products.json",
  showProducts,
  main
);
productsLoader.loadProducts();

function main() {
  const addToCartButtons = document.querySelectorAll(
    ".products__list-item__add-button"
  );

  const cart = new Cart("cart", cartProductsList, totalPriceLabel);
  cart.displayCartItems();

  addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      const buttonParent = addToCartButton.parentNode.parentNode;
      cart.addItem(buttonParent);
    });
  });

  clearCartButton.addEventListener("click", (event) => {
    cart.clearCart();
  });
}
