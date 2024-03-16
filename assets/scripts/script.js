"use strict";

import { ProductsLoader } from "./modules/products-loader.js";
import { main, categories } from "./modules/cart-handler.js";

const body = document.body;
const productsToGenerateContainer = document.querySelector(
  ".products-container"
);
const amountProductsToDisplay = 12;

function generateProductsSection(
  htmlContent,
  productsCategory,
  showStoreButton
) {
  if (productsToGenerateContainer) {
    let productsSectionText = `<section class="products mb-5" id="products-${productsCategory.title}" data-aos="fade-up" data-aos-duration="2000">
    <div class="container">
        <div class="products__wrap">
            <div class="text-content">
                <h2 class="products__title text-center">${productsCategory.title}</h2>
                <p class="products__description text-center">${productsCategory.description}</p>
            </div>
            <div class="products__list mt-5">${htmlContent}</div>
            `;
    if (showStoreButton) {
      productsSectionText += `<div class="products__more text-center mt-5"><a href="./store.html" class="btn btn-primary btn-lg">Shop More</a></div>`;
    }
    productsSectionText += `</div></div></section>`;
    productsToGenerateContainer.innerHTML += productsSectionText;
  }
}

if (productsToGenerateContainer) {
  let productsLoader = null;

  if (body.dataset.svPage === "home") {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      categories.latestDeals,
      generateProductsSection,
      main
    );
    productsLoader.loadProducts(amountProductsToDisplay);
  } else if (body.dataset.svPage === "store") {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      categories.latestDeals,
      generateProductsSection,
      main
    );
    productsLoader.loadProducts(amountProductsToDisplay);

    productsLoader.productsCategory = categories.laptops;
    // productsLoader.displayProducts(amountProductsToDisplay);
    productsLoader.loadProducts(amountProductsToDisplay);

    productsLoader.productsCategory = categories.iphones;
    // productsLoader.displayProducts(amountProductsToDisplay);
    productsLoader.loadProducts(amountProductsToDisplay);
  }
} else {
  main();
}

AOS.init();
