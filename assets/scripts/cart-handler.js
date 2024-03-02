import { Cart } from "./modules/cart.js";
import imagesLoader from "./images-loader.js";

const cartProductsList = document.querySelector(
  ".header__cart__list .items-list"
);

const totalPriceLabel = document.querySelector(".items-total-price");
const clearCartButton = document.querySelector("#clearCartButton");

export function main() {
  const addToCartButtons = document.querySelectorAll(
    ".products__list-item__add-button"
  );

  const cart = new Cart("cart", cartProductsList, totalPriceLabel);
  cart.displayCartItems();

  imagesLoader();

  addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      addToCartButton.innerHTML = "Added to your cart";
      setTimeout(() => {
        addToCartButton.innerHTML = "Add to the cart";
      }, 1000);
      const buttonParent = addToCartButton.parentNode.parentNode;
      cart.addItem(buttonParent);
    });
  });

  clearCartButton.addEventListener("click", (event) => {
    cart.clearCart();
  });
}
