import { Cart } from "./cart.js";
import imagesLoader from "../images-loader.js";
import Category from "./category.js";

const cartProductsList = document.querySelector(
  ".header__cart-list .items-list"
);

const totalPriceLabel = document.querySelector(".items-total-price");
const clearCartButton = document.querySelector("#clearCartButton");

export function main() {
  const addToCartButtons = document.querySelectorAll(".products__add-button");

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

export const categories = {
  latestDeals: new Category(
    "Latest Deals",
    `Discover our diverse selection of high-quality
  tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
  elevate
  your digital experience. Explore our curated collection and find the perfect device to
  suit your needs and style.`,
    true
  ),
  iphones: new Category(
    "Iphone",
    `Discover the latest innovations in mobile technology with our selection of iPhones. From the sleek design to the cutting-edge features, each iPhone offers a seamless blend of style and performance. Whether you're captivated by the stunning displays, powerful cameras, or intuitive user experience, there's an iPhone to suit every need and preference. Explore our collection to find the perfect balance of elegance and functionality, and elevate your mobile experience with the iconic iPhone.`
  ),
  laptops: new Category(
    "Laptop",
    `Elevate your productivity and computing experience with our range of laptops. Designed for performance and versatility, our laptops offer powerful processing capabilities, stunning displays, and sleek, portable designs. Whether you're a professional looking for a reliable workhorse or a student seeking a versatile device for studying and entertainment, our selection of laptops caters to diverse needs and preferences. From ultra-portable models for on-the-go productivity to high-performance machines for gaming and multimedia tasks, explore our collection to find the perfect laptop to match your lifestyle.`
  ),
};

export const currency = "$";
