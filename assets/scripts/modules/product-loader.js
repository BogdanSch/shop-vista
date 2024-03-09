import { Product } from "./product.js";

export class ProductsLoader {
  constructor(
    productsDataPath = "../data/products.json",
    productsCategory = "all",
    showProducts,
    callback
  ) {
    this.productsDataPath = productsDataPath;
    this.productsCategory = productsCategory;
    this.showProducts = showProducts;
    this.callback = callback;
  }
  loadProducts(amountToShow) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        let response = JSON.parse(httpRequest.responseText);
        this.displayProducts(response, amountToShow);
        this.callback();
      }
    };

    httpRequest.open("GET", this.productsDataPath, true);
    httpRequest.send();
  }

  displayProducts(products, amountToShow) {
    let filteredProducts = [];
    if (this.productsCategory === "all") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) => product.category === this.productsCategory
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

    this.showProducts(productListHTML);
  }
  // displayProducts(products, amountToShow) {
  //   let productListHTML = "";
  //   console.log(this.productsCategory);

  //   products.forEach(function (product) {
  //     if (
  //       product.category === "all" ||
  //       product.category === this.productsCategory
  //     ) {
  //       const newProduct = new Product(
  //         product.id,
  //         product.name,
  //         product.picture,
  //         product.price,
  //         1,
  //         product.category
  //       );
  //       productListHTML += newProduct.renderProduct();
  //     }
  //   });

  //   this.showProducts(productListHTML);
  // }
}
