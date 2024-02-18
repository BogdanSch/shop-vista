export class Product {
  constructor(id, name, picture, price, amount) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.price = price;
    this.amount = amount;
  }
  renderProduct() {
    return `
    <div class="products__list-item card" data-product-id="${this.id}">
     <img class="products__list-item__picture" src="${this.picture}" alt="${this.name}">
      <div class="card-body">
        <h3 class="products__list-item__title card-title">${this.name}</h3>
        <p>Price: <span class="products__list-item__price">${this.price}</span>$</p>
        <button class="products__list-item__add-button btn btn-outline-primary">Add
        to Cart</button>
      </div>
    </div>`;
  }
  renderCartProduct() {
    return `
    <li class="header__cart__list-item" data-product-id="${this.id}">
      <img class="header__cart__list-item__image" src="${this.picture}" alt="${this.name}">
      <h3 class="header__cart__list-item__title">${this.name}</h3>
      <div class="header__cart__list-item__controls">
          <button class="btn btn-minus">-</button>
          <input type="text" class="form-control amount-input w-25" name="amountInput">
          <button class="btn btn-add">+</button> 
      </div>
      <span class="header__cart__list-item__price">${this.price}$</span>
    </li>`;
  }
}
