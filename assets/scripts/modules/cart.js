import { Product } from "./product.js";

export class Cart {
  #currency = `$`;

  constructor(name, cartProductsList, totalPriceLabel) {
    this.name = name;
    this.cartProductsList = cartProductsList;
    this.totalPriceLabel = totalPriceLabel;
    this.cartData = this.getCartData();
  }

  setCartData() {
    localStorage.setItem(this.name, JSON.stringify(this.cartData)) || {};
  }

  getCartData() {
    this.cartData = JSON.parse(localStorage.getItem(this.name)) || {};
    return this.cartData;
  }

  addItem(item) {
    this.getCartData();

    const itemId = item.getAttribute("data-product-id");

    if (this.cartData.hasOwnProperty(itemId)) {
      this.cartData[itemId][3] += 1;
    } else {
      const itemPicture = item.querySelector(`[class*="__picture"]`).src;
      const itemTitle = item.querySelector(`[class*="__title"]`).innerHTML;
      const itemPrice = item.querySelector(`[class*="__price"]`).innerHTML;

      this.cartData[itemId] = [itemTitle, itemPicture, itemPrice, 1];
    }

    this.setCartData();
    this.displayCartItems();
  }
  removeItem(item) {
    this.getCartData();
    const itemId = item.getAttribute("data-product-id");

    if (this.cartData.hasOwnProperty(itemId)) {
      this.cartData[itemId][3] -= 1;

      if (this.cartData[itemId][3] <= 0) {
        delete this.cartData[itemId];
      }
    } else {
      throw new Error("No such item was found!");
    }

    this.setCartData();
    this.displayCartItems();
  }
  clearCart() {
    localStorage.removeItem(this.name);
    this.displayCartItems();
  }
  displayCartItems() {
    this.getCartData();
    if (Object.keys(this.cartData).length) {
      let htmlContent = "";
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const productData = this.cartData[key];
          const product = new Product(
            key,
            productData[0],
            productData[1],
            productData[2] * productData[3],
            productData[3]
          );
          htmlContent += product.renderCartProduct();
        }
        this.cartProductsList.innerHTML = htmlContent;
      }

      this.addCartHandlers();
      this.displayTotalPrice();
    } else {
      this.cartProductsList.innerHTML = `Nothing yet to buy...`;
      this.displayTotalPrice();
    }
  }
  addCartHandlers() {
    const plusItemButtons = this.cartProductsList.querySelectorAll(".btn-add");
    const minusItemButtons =
      this.cartProductsList.querySelectorAll(".btn-minus");

    plusItemButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.addItem(button.parentNode.parentNode);
      });
    });
    minusItemButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.removeItem(button.parentNode.parentNode);
      });
    });
  }

  displayTotalPrice() {
    if (Object.keys(this.cartData).length) {
      let totalPrice = 0;
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const product = this.cartData[key];
          totalPrice += parseFloat(product[2]) * parseFloat(product[3]);
        }
      }
      this.totalPriceLabel.innerHTML = `${totalPrice}${this.#currency}`;
    } else {
      this.totalPriceLabel.innerHTML = `0${this.#currency}`;
    }
  }
}
