import { Product } from "./product.js";

export class ProductsLoader {
  constructor(productsDataPath, showProducts, callback) {
    this.productsDataPath = productsDataPath;
    this.showProducts = showProducts;
    this.callback = callback;
  }

  async loadProducts(productsCategory, amountToShow) {
    try {
      const response = await fetch(this.productsDataPath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const loadedProducts = await response.json();
      this.displayProducts(loadedProducts, productsCategory, amountToShow);
      this.callback();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  displayProducts(loadedProducts, productsCategory, amountToShow) {
    let filteredProducts = [];
    if (productsCategory.isDealsCategory) {
      filteredProducts = loadedProducts;
    } else {
      filteredProducts = loadedProducts.filter(product => product.category === productsCategory.title);
    }
    filteredProducts = filteredProducts.slice(0, amountToShow);

    const productListHTML = filteredProducts
      .map(product => {
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
      productsCategory,
      productsCategory.isDealsCategory
    );
  }
}
