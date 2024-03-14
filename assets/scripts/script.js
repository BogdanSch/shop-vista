"use strict";

import { ProductsLoader } from "./modules/product-loader.js";
import { main } from "./modules/cart-handler.js";

const productsList = document.querySelector(".products__list");
const body = document.body;
const productsToGenerateContainer = document.querySelector(
  ".products-container"
);

function showProducts(htmlContent) {
  productsList.innerHTML = htmlContent;
}

function generateProductsSection(htmlContent, productsCategory) {
  if (productsToGenerateContainer) {
    const productsSectionText = `<section class="products mb-5" id="products-${productsCategory}" data-aos="fade-up" data-aos-duration="2000">
    <div class="container">
        <div class="products__wrap">
            <div class="text-content">
                <h2 class="products__title text-center">${productsCategory}</h2>
                <p class="products__description text-center">Discover our diverse selection of high-quality
                    tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
                    elevate
                    your digital experience. Explore our curated collection and find the perfect device to
                    suit your needs and style.</p>
            </div>
            <div class="products__list mt-5">${htmlContent}</div>
            <div class="products__more text-center mt-5">
                <a href="./store.html" class="btn btn-primary btn-lg">Shop More</a>
            </div>
        </div>
    </div>
</section>`;
    productsToGenerateContainer.innerHTML += productsSectionText;
  }
}

if (productsList || productsToGenerateContainer) {
  let productsLoader = null;
  if (body.dataset.svPage === "home") {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      "all",
      showProducts,
      main
    );
    productsLoader.loadProducts(12);
  } else if (body.dataset.svPage === "store") {
    productsLoader = new ProductsLoader(
      "../data/products.json",
      "all",
      generateProductsSection,
      main
    );
    productsLoader.loadProducts(12);

    productsLoader.productsCategory = "Laptop";
    productsLoader.displayProducts(12);

    productsLoader.productsCategory = "Iphone";
    productsLoader.displayProducts(12);
  }
} else {
  main();
}

AOS.init();
