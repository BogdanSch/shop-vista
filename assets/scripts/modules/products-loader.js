import { Product } from "./product.js";

export class ProductsLoader {
  constructor(
    productsDataPath = "../data/products.json",
    productsCategory,
    showProducts,
    callback
  ) {
    this.productsDataPath = productsDataPath;
    this.productsCategory = productsCategory;
    this.showProducts = showProducts;
    this.callback = callback;
  }
  // loadProducts(amountToShow) {
  //   let httpRequest = new XMLHttpRequest();

  //   httpRequest.onreadystatechange = () => {
  //     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
  //       let response = JSON.parse(httpRequest.responseText);
  //       this.loadedProducts = response;
  //       this.displayProducts(amountToShow);
  //       this.callback();
  //     }
  //   };

  //   httpRequest.open("GET", this.productsDataPath, true);
  //   httpRequest.send();
  // }
  async loadProducts(amountToShow) {
    try {
      const response = await fetch(this.productsDataPath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.loadedProducts = await response.json();
      this.displayProducts(amountToShow);
      this.callback();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  displayProducts(amountToShow) {
    let filteredProducts = [];
    if (this.productsCategory.isDealsCategory) {
      filteredProducts = this.loadedProducts;
    } else {
      console.log(this.loadedProducts);
      filteredProducts = this.loadedProducts.filter(
        (product) => product.category === this.productsCategory.title
      );
    }
    filteredProducts = filteredProducts.slice(0, amountToShow);

    const productListHTML = filteredProducts
      .map((product) => {
        const newProduct = new Product(
          product.id,
          product.name,
          product.picture,
          product.price,
          1,
          product.category
        );
        return newProduct.renderProduct();
      })
      .join("");

    this.showProducts(
      productListHTML,
      this.productsCategory,
      this.productsCategory.isDealsCategory
    );
  }
}
