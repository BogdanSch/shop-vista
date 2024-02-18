import { Product } from "./product.js";

export class Cart {
  constructor(name, cartProductsList) {
    this.name = name;
    this.cartProductsList = cartProductsList;
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
    const itemPicture = item.querySelector(".products__list-item__picture").src;
    const itemTitle = item.querySelector(
      ".products__list-item__title"
    ).innerHTML;
    const itemPrice = item.querySelector(
      ".products__list-item__price"
    ).innerHTML;

    if (this.cartData.hasOwnProperty(itemId)) {
      this.cartData[itemId][3] += 1;
    } else {
      this.cartData[itemId] = [itemTitle, itemPicture, itemPrice, 1];
    }

    this.setCartData();
    this.displayCartItems();
  }
  clearCart() {
    localStorage.removeItem(this.name);
  }
  displayCartItems() {
    if (this.cartData) {
      let htmlContent = "";
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const productData = this.cartData[key];
          const product = new Product(
            key,
            productData[0],
            productData[1],
            productData[2],
            productData[3]
          );
          htmlContent += product.renderCartProduct();
        }
      }
      this.cartProductsList.innerHTML = htmlContent;
    }
  }
  getProductsCount() {
    if (this.cartData) {
      let count = 0;
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const product = this.cartData[key];
          count += product[3];
        }
      }
      return count;
    }
  }
}
