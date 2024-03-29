// import { Cart } from "./modules/cart.js";
// import Category from "./modules/category.js";
// import { ProductsLoader } from "./modules/products-loader.js";

// export const categories = {
//   latestDeals: new Category(
//     "Latest Deals",
//     `Discover our diverse selection of high-quality
//   tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
//   elevate
//   your digital experience. Explore our curated collection and find the perfect device to
//   suit your needs and style.`,
//     true
//   ),
//   iphones: new Category(
//     "Iphone",
//     `Discover the latest innovations in mobile technology with our selection of iPhones. From the sleek design to the cutting-edge features, each iPhone offers a seamless blend of style and performance. Whether you're captivated by the stunning displays, powerful cameras, or intuitive user experience, there's an iPhone to suit every need and preference. Explore our collection to find the perfect balance of elegance and functionality, and elevate your mobile experience with the iconic iPhone.`
//   ),
//   laptops: new Category(
//     "Laptop",
//     `Elevate your productivity and computing experience with our range of laptops. Designed for performance and versatility, our laptops offer powerful processing capabilities, stunning displays, and sleek, portable designs. Whether you're a professional looking for a reliable workhorse or a student seeking a versatile device for studying and entertainment, our selection of laptops caters to diverse needs and preferences. From ultra-portable models for on-the-go productivity to high-performance machines for gaming and multimedia tasks, explore our collection to find the perfect laptop to match your lifestyle.`
//   ),
// };

// export function cardHandler() {
//   const cartProductsList = document.querySelector(
//     ".header__cart-list .items-list"
//   );

//   const body = document.body;
//   const productsToGenerateContainer = document.querySelector(
//     ".products-container"
//   );
//   const amountProductsToDisplay = 12;
//   const totalPriceLabel = document.querySelector(".items-total-price");
//   const clearCartButton = document.querySelector("#clearCartButton");

//   function main() {
//     const addToCartButtons = document.querySelectorAll(".products__add-button");

//     const cart = new Cart("cart", cartProductsList, totalPriceLabel);
//     cart.displayCartItems();

//     addToCartButtons.forEach((addToCartButton) => {
//       addToCartButton.addEventListener("click", (event) => {
//         addToCartButton.innerHTML = "Added to the cart";
//         setTimeout(() => {
//           addToCartButton.innerHTML = "Add to the cart";
//         }, 1000);
//         const buttonParent = addToCartButton.parentNode.parentNode;
//         cart.addItem(buttonParent);
//       });
//     });

//     clearCartButton.addEventListener("click", (event) => {
//       cart.clearCart();
//     });
//   }

//   function generateProductsSection(
//     htmlContent,
//     productsCategory,
//     showStoreButton
//   ) {
//     if (productsToGenerateContainer) {
//       let productsSectionText = `<section class="products mt-5 mb-5" id="products-${productsCategory.title}" data-aos="fade-up" data-aos-duration="2000">
//       <div class="container">
//           <div class="products__wrap">
//               <div class="text-content">
//                   <h2 class="products__title text-center">${productsCategory.title}</h2>
//                   <p class="products__description text-center">${productsCategory.description}</p>
//               </div>
//               <div class="products__list mt-5">${htmlContent}</div>
//               `;
//       if (showStoreButton) {
//         productsSectionText += `<div class="products__more text-center mt-5"><a href="./store.html" class="btn btn-primary btn-lg">Shop More</a></div>`;
//       }
//       productsSectionText += `</div></div></section>`;
//       productsToGenerateContainer.innerHTML += productsSectionText;
//     }
//   }

//   if (productsToGenerateContainer) {
//     let productsLoader = null;

//     if (body.dataset.svPage === "home") {
//       productsLoader = new ProductsLoader(
//         "./data/products.json",
//         categories.latestDeals,
//         generateProductsSection,
//         main
//       );
//       productsLoader.loadProducts(amountProductsToDisplay);
//     } else if (body.dataset.svPage === "store") {
//       productsLoader = new ProductsLoader(
//         "./data/products.json",
//         categories.latestDeals,
//         generateProductsSection,
//         main
//       );
//       productsLoader.loadProducts(amountProductsToDisplay);

//       productsLoader.productsCategory = categories.laptops;
//       productsLoader.loadProducts(amountProductsToDisplay);

//       productsLoader.productsCategory = categories.iphones;
//       productsLoader.loadProducts(amountProductsToDisplay);
//     }
//   }
// }


// export const currency = "$";

import { Cart } from "./modules/cart.js";
import Category from "./modules/category.js";
import { ProductsLoader } from "./modules/products-loader.js";

export const categories = {
  latestDeals: new Category(
    "Latest Deal",
    `Discover our diverse selection of high-quality
  tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
  elevate
  your digital experience. Explore our curated collection and find the perfect device to
  suit your needs and style.`,
    true
  ),
  iphones: new Category(
    "Iphone",
    `Discover the latest innovations in mobile technology with our selection of iPhones. Explore our collection to find the perfect balance of elegance and functionality, and elevate your mobile experience with the iconic iPhone.`
  ),
  laptops: new Category(
    "Laptop",
    `Elevate your productivity and computing experience with our range of laptops. Whether you're a professional looking for a reliable workhorse or a student seeking a versatile device for studying and entertainment, our selection of laptops caters to diverse needs and preferences. From ultra-portable models for on-the-go productivity to high-performance machines for gaming and multimedia tasks, explore our collection to find the perfect laptop to match your lifestyle.`
  ),
};

export function cardHandler() {
  const cartProductsList = document.querySelector(
    ".header__cart-list .items-list"
  );
  const body = document.body;
  const productsToGenerateContainer = document.querySelector(
    ".products-container"
  );
  const amountProductsToDisplay = 12;
  const totalPriceLabel = document.querySelector(".items-total-price");
  const clearCartButton = document.querySelector("#clearCartButton");

  function main() {
    const addToCartButtons = document.querySelectorAll(".products__add-button");
    const cart = new Cart("cart", cartProductsList, totalPriceLabel);
    cart.displayCartItems();

    addToCartButtons.forEach(addToCartButton => {
      addToCartButton.addEventListener("click", event => {
        addToCartButton.innerHTML = "Added to the cart";
        setTimeout(() => {
          addToCartButton.innerHTML = "Add to the cart";
        }, 1000);
        const buttonParent = addToCartButton.parentNode.parentNode;
        cart.addItem(buttonParent);
      });
    });

    clearCartButton.addEventListener("click", event => {
      cart.clearCart();
    });
    if (body.dataset.svPage === "check-out") {
      const checkOutForm = document.querySelector(".check-out__form");
      checkOutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        cart.clearCart();
        window.location = "/dist/check-out-success.html";
      })
    }
  }

  function generateProductsSection(
    htmlContent,
    productsCategory,
    showStoreButton
  ) {
    if (productsToGenerateContainer) {
      let productsSectionText = `<section class="products" id="products-${productsCategory.title}" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="linear">
      <div class="container">
          <div class="products__wrap">
              <div class="text-content">
                  <h2 class="products__title text-center">${productsCategory.title}s</h2>
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
        "./data/products.json",
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(categories.latestDeals, amountProductsToDisplay);
    } else if (body.dataset.svPage === "store") {
      productsLoader = new ProductsLoader(
        "./data/products.json",
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(categories.laptops, amountProductsToDisplay);
      productsLoader.loadProducts(categories.iphones, amountProductsToDisplay);
    }
  }
}

export const currency = "$";

