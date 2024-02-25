import { Product } from "./product.js";

export class ProductsLoader {
  constructor(
    productsDataPath = "../data/products.json",
    showProducts,
    callback
  ) {
    this.productsDataPath = productsDataPath;
    this.showProducts = showProducts;
    this.callback = callback;
  }
  loadProducts() {
    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        let response = JSON.parse(httpRequest.responseText);
        this.displayProducts(response);
        this.callback();
      }
    };

    httpRequest.open("GET", this.productsDataPath, true);
    httpRequest.send();
  }

  displayProducts(products) {
    let productListHTML = "";

    products.forEach(function (product) {
      const newProduct = new Product(
        product.id,
        product.name,
        product.picture,
        product.price,
        1
      );
      productListHTML += newProduct.renderProduct();
    });
    this.showProducts(productListHTML);
  }
}
