import { currency } from "../cart-handler.js";

export class Product {
  constructor(id, name, picture, price, amount, category) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.price = price;
    this.amount = amount;
    this.category = category;
  }
  renderProduct() {
    return `
    <div class="products__item card" data-product-id="${this.id}" data-aos="zoom-in-up" data-aos-duration="1000">
     <img class="products__item-picture" src="${this.picture}" alt="${this.name}">
      <div class="card-body">
        <h3 class="products__item-title card-title">${this.name}</h3>
        <p>Price: <span class="products__item-price">${this.price}</span>${currency}</p>
        <p>Category: <span class="products__item-category">${this.category}</span></p>
        <button class="products__add-button btn btn-outline-primary">Add to Cart</button>
      </div>
    </div>`;
  }
  renderCartProduct() {
    return `
    <li class="header__cart-item" data-product-id="${this.id}">
      <img class="header__cart-item__picture" src="${this.picture}" alt="${this.name}">
      <h3 class="header__cart-item__title">${this.name}</h3>
      <div class="header__cart-item__controls">
          <button class="btn btn-minus">-</button>
          <input type="number" class="form-control amount-input" disabled="" value="${this.amount}" name="amountInput">
          <button class="btn btn-add">+</button> 
      </div>
      <span class="header__cart-item__price">${this.price}${currency}</span>
    </li>`;
  }
}
