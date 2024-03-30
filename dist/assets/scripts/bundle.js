/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/js/authentication-handler.js":
/*!**************************************************!*\
  !*** ./src/scripts/js/authentication-handler.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_authentication_user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/authentication/user.js */ "./src/scripts/js/modules/authentication/user.js");
/* harmony import */ var _modules_authentication_user_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/authentication/user-manager.js */ "./src/scripts/js/modules/authentication/user-manager.js");
/* harmony import */ var _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/authentication/cookie.js */ "./src/scripts/js/modules/authentication/cookie.js");






const authenticationHandlerModule = () => {
  const body = document.body;
  const loggedInUserCookieName = "loggedInUser";
  const cookieLifeDuration = new Date();
  cookieLifeDuration.setTime(cookieLifeDuration.getTime() + (2 * 3600 * 1000));

  const userManager = new _modules_authentication_user_manager_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  let loginCookie = _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"].get(loggedInUserCookieName);

  const signIn = (email, password) => {
    const user = userManager.findUser(email, password);
    if (user) {
      new _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"](loggedInUserCookieName, email, cookieLifeDuration);
      return true;
    } else {
      return false;
    }
  };

  const signUp = (name, email, number, password) => {
    const user = new _modules_authentication_user_js__WEBPACK_IMPORTED_MODULE_0__["default"](name, email, number, password);
    userManager.addUser(user);
    new _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"](loggedInUserCookieName, email, cookieLifeDuration);
  };

  const handleSignInForm = () => {
    const signInForm = $("#signInForm");
    signInForm.on("submit", (event) => {
      event.preventDefault();
      const email = signInForm.find("#inputEmail").val();
      const password = signInForm.find("#inputPassword").val();
      if (signIn(email, password)) location.href = "/dist/";
    });
  };

  const handleSignUpForm = () => {
    const signUpForm = $("#signUpForm");
    signUpForm.on("submit", (event) => {
      event.preventDefault();
      const name = signUpForm.find("#inputName").val();
      const email = signUpForm.find("#inputEmail").val();
      const number = signUpForm.find("#inputNumber").val();
      const password = signUpForm.find("#inputPassword").val();
      signUp(name, email, number, password);
      location.href = "/dist/";
    });
  };

  const initialize = () => {
    if (body.dataset.svPage === "sign-in") {
      handleSignInForm();
    } else if (body.dataset.svPage === "sign-up") {
      handleSignUpForm();
    } else {
      if (loginCookie) {
        $(".header .profile__dropdown").html(`<li><button class="btn btn-log-out dropdown-item">Log out</button></li>`);
        $(".header .profile__dropdown .btn-log-out").on("click", () => {
          _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"].delete(loggedInUserCookieName);
          location.href = "/dist/";
        });
      } else {
        $(".header .profile__dropdown").html(`
          <li><a class="dropdown-item" href="./sign-in.html">Sign in</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="./sign-up.html">Sign up</a></li>
        `);
      }
    }
  };

  initialize();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authenticationHandlerModule);


/***/ }),

/***/ "./src/scripts/js/cart-handler.js":
/*!****************************************!*\
  !*** ./src/scripts/js/cart-handler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cardHandler: () => (/* binding */ cardHandler),
/* harmony export */   categories: () => (/* binding */ categories),
/* harmony export */   currency: () => (/* binding */ currency)
/* harmony export */ });
/* harmony import */ var _modules_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cart.js */ "./src/scripts/js/modules/cart.js");
/* harmony import */ var _modules_category_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/category.js */ "./src/scripts/js/modules/category.js");
/* harmony import */ var _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/products-loader.js */ "./src/scripts/js/modules/products-loader.js");




const categories = {
  latestDeals: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Latest Deal",
    `Discover our diverse selection of high-quality
  tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
  elevate
  your digital experience. Explore our curated collection and find the perfect device to
  suit your needs and style.`,
    true
  ),
  iphones: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Iphone",
    `Discover the latest innovations in mobile technology with our selection of iPhones. Explore our collection to find the perfect balance of elegance and functionality, and elevate your mobile experience with the iconic iPhone.`
  ),
  laptops: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Laptop",
    `Elevate your productivity and computing experience with our range of laptops. Whether you're a professional looking for a reliable workhorse or a student seeking a versatile device for studying and entertainment, our selection of laptops caters to diverse needs and preferences. From ultra-portable models for on-the-go productivity to high-performance machines for gaming and multimedia tasks, explore our collection to find the perfect laptop to match your lifestyle.`
  ),
};

function cardHandler() {
  const cartProductsList = document.querySelector(".cart .items-list");
  const body = document.body;
  const productsToGenerateContainer = document.querySelector(".products-container");
  const amountProductsToDisplay = 12;
  const totalPriceLabel = document.querySelector(".items-total-price");
  const clearCartButton = document.querySelector("#clearCartButton");

  function main() {
    const addToCartButtons = document.querySelectorAll(".products__add-button");
    const cart = new _modules_cart_js__WEBPACK_IMPORTED_MODULE_0__.Cart("cart", cartProductsList, totalPriceLabel);
    cart.displayCartItems();

    addToCartButtons.forEach(addToCartButton => {
      addToCartButton.addEventListener("click", event => {
        addToCartButton.innerHTML = "Added to the cart";
        setTimeout(() => {
          addToCartButton.innerHTML = "Add to the cart";
        }, 1000);
        const buttonParent = addToCartButton.parentNode.parentNode;
        cart.addItem(buttonParent);
      });
    });

    clearCartButton.addEventListener("click", event => {
      cart.clearCart();
    });

    if (body.dataset.svPage === "check-out") {
      const checkOutForm = document.querySelector(".check-out__form");
      checkOutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        cart.clearCart();
        window.location.assign("/dist/check-out-success.html");
      })
    }
  }

  function generateProductsSection(
    htmlContent,
    productsCategory,
    showStoreButton
  ) {
    if (productsToGenerateContainer) {
      let productsSectionText = `<section class="products" id="products-${productsCategory.title}" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="linear">
      <div class="container">
          <div class="products__wrap">
              <div class="text-content">
                  <h2 class="products__title text-center">${productsCategory.title}s</h2>
                  <p class="products__description text-center">${productsCategory.description}</p>
              </div>
              <div class="products__list mt-5">${htmlContent}</div>
              `;
      if (showStoreButton) {
        productsSectionText += `<div class="products__more text-center mt-5"><a href="./store.html" class="btn btn-primary btn-lg">Shop More</a></div>`;
      }
      productsSectionText += `</div></div></section>`;
      productsToGenerateContainer.innerHTML += productsSectionText;
    }
  }

  if (productsToGenerateContainer) {
    let productsLoader = null;

    if (body.dataset.svPage === "home") {
      productsLoader = new _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__.ProductsLoader(
        "./data/products.json",
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(categories.latestDeals, amountProductsToDisplay);
    } else if (body.dataset.svPage === "store") {
      productsLoader = new _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__.ProductsLoader(
        "./data/products.json",
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(categories.laptops, amountProductsToDisplay);
      productsLoader.loadProducts(categories.iphones, amountProductsToDisplay);
    }
  } else {
    if (body.dataset.svPage === "page" || body.dataset.svPage === "page") {
      main();
    }
  }
}

const currency = "$";



/***/ }),

/***/ "./src/scripts/js/chat-bot.js":
/*!************************************!*\
  !*** ./src/scripts/js/chat-bot.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chatbotModule)
/* harmony export */ });


class Chatbot {
  #closeSvg = `<use xlink:href='#close'></use>`;
  #chatSvg = `<use xlink:href='#message'></use>`;
  constructor() {
    this.phrases = {
      main: [
        "Our manager will call you back soon!",
        "You can clarify the details by phone at 123456789",
        "Stay connected!",
        "Today is a beautiful weather!",
        "It's very pleasant to communicate with you!",
      ],
      hello: "Hey there!",
      bye: "Glad to talk to you. See you next time!",
      aboutStore:
        "Our online store offers a wide range of products at competitive prices.",
      contactInfo:
        "You can contact us at support@example.com or call us at 123-456-7890.",
      hoursOfOperation:
        "Our store is open Monday to Friday from 9:00 AM to 5:00 PM.",
    };

    this.chatbotElement = $(".chatbot__form");
    this.questionInput = $("#questionInput");
    this.answers = $("#answers");

    this.openChatbotButton = $(".chatbot__button");
    this.chatbotSvg = this.openChatbotButton.find(".chatbot__svg");

    this.isOpen = false;
  }

  init() {
    this.displayMessage("bot", this.phrases.hello);

    this.openChatbotButton.on("click", () => {
      this.isOpen = !this.isOpen
      let svgImage = this.isOpen ? this.#closeSvg : this.#chatSvg;
      this.chatbotElement.toggleClass("show");
      this.chatbotSvg.html(svgImage);
    });

    $("#questionInput, #chatbotSubmit").on("click", () => {
      return false;
    });

    $("#chatbotSubmit").on("click", () => {
      let question = this.questionInput.val().trim();

      if (!this.checkString(question)) {
        this.questionInput.val("");
        this.displayMessage("user", question);

        setTimeout(() => {
          if (question.toLowerCase().includes("bye")) {
            this.displayMessage("bot", this.phrases.bye);
          } else if (question.toLowerCase().includes("about")) {
            this.displayMessage("bot", this.phrases.aboutStore);
          } else if (question.toLowerCase().includes("contact")) {
            this.displayMessage("bot", this.phrases.contactInfo);
          } else if (question.toLowerCase().includes("hours") || question.toLowerCase().includes("open")) {
            this.displayMessage("bot", this.phrases.hoursOfOperation);
          } else {
            const randomIndex = Math.floor(
              Math.random() * this.phrases.main.length
            );
            this.displayMessage("bot", this.phrases.main[randomIndex]);
          }

          this.scrollToBottom(); // Scroll to bottom after displaying bot's response
        }, 1000);
      }
    });

    this.questionInput.keypress("keyup", this.enterKey);
  }

  displayMessage(user, message) {
    this.answers.append(`<div class="answers__${user}">${message}</div>`);
  }

  enterKey(event) {
    if (event.keyCode === 13) {
      $("#chatbotSubmit").click();
      return false;
    }
  }

  checkString(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  scrollToBottom() {
    this.chatbotElement.animate(
      {
        scrollTop: this.chatbotElement.prop("scrollHeight")
      },
      10
    );
  }
}

function chatbotModule() {
  const chatbot = new Chatbot();
  chatbot.init();
}


/***/ }),

/***/ "./src/scripts/js/header.js":
/*!**********************************!*\
  !*** ./src/scripts/js/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ headerModule)
/* harmony export */ });


function headerModule() {
  (function ($, undefined) {
    function handleLinks(links, currentPage) {
      links.each(function (link) {
        let elementHref = $(this).attr("href").split("./").pop();

        if (currentPage === elementHref) {
          $(this).addClass("active");
          return;
        }
      });
    }
    const indexPage = ["index.html", "/dist/", "", "/"];
    let path = window.location.pathname;
    let currentPage = path.split("/").pop();

    const allHeaderLinks = $(".header__item a");
    const allFooterLinks = $(".footer__item a");

    if (indexPage.includes(currentPage)) {
      $(".header__item a").first().addClass("active");
      $(".footer__item a").first().addClass("active");
    } else {
      handleLinks(allHeaderLinks, currentPage);
      handleLinks(allFooterLinks, currentPage);
    }

    const headerOffset = 20;

    window.addEventListener("scroll", () => {
      const header = $("header");
      if (window.scrollY >= headerOffset) {
        header.addClass("sticky");
      } else {
        if (header.hasClass("sticky")) {
          header.removeClass("sticky");
        }
      }
    });
    $('.header__burger').click(function (event) {
      $('.header__burger, .header__menu').toggleClass('active');
      $('body').toggleClass('lock');
    });
  })(jQuery);
}


/***/ }),

/***/ "./src/scripts/js/images-loader.js":
/*!*****************************************!*\
  !*** ./src/scripts/js/images-loader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const imagesLoaderModule = () => {
  const placeholderPath = `https://placehold.co/600x400`;

  const images = document.querySelectorAll("img");

  function setupImages() {
    images.forEach((image) => {
      if (!image.parentNode.classList.contains("carousel-item")) {
        const imageSrc = image.getAttribute("src");
        image.setAttribute("data-img-src", imageSrc);
        image.setAttribute("src", placeholderPath);
      }
    });
  }

  setupImages();

  function isInViewport(element, offset = 300) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= -offset &&
      rect.bottom <= document.documentElement.clientHeight + offset &&
      rect.right <= document.documentElement.clientWidth + offset
    );
  }

  function handleImageChange() {
    images.forEach((image) => {
      if (isInViewport(image)) {
        const dataSrc = image.getAttribute("data-img-src");
        if (dataSrc && image.src !== dataSrc) {
          image.src = dataSrc;
        }
      }
    });
  }

  handleImageChange();

  window.addEventListener("scroll", handleImageChange);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imagesLoaderModule);


/***/ }),

/***/ "./src/scripts/js/input-handlers.js":
/*!******************************************!*\
  !*** ./src/scripts/js/input-handlers.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const inputHandlers = () => {
    (function ($, undefined) {
        const userPhone = $(".contact__form #phone, .auth__form #inputNumber, .check-out__form #phone");
        userPhone.mask("+380 (99) 999 9999", { placeholder: "" });

        const bankCardField = $(".check-out__form #cardNumber");
        bankCardField.mask("1234 1234 1234", { placeholder: "" });
    })(jQuery);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inputHandlers);


/***/ }),

/***/ "./src/scripts/js/modules/authentication/cookie.js":
/*!*********************************************************!*\
  !*** ./src/scripts/js/modules/authentication/cookie.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cookie)
/* harmony export */ });
class Cookie {
  constructor(name, value, expireDate) {
    this.name = name;
    this.value = value;
    this.expireDate = expireDate;
    this.initCookie();
  }

  initCookie() {
    const cookieString = `${this.name}=${this.value};expires=${this.expireDate.toUTCString()};path=/`;
    document.cookie = cookieString;
  }

  static getAll() {
    return document.cookie.split('; ').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=');
      cookies[name] = value;
      return cookies;
    }, {});
  }

  static get(name) {
    return this.getAll()[name];
  }

  static delete(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

/***/ }),

/***/ "./src/scripts/js/modules/authentication/user-manager.js":
/*!***************************************************************!*\
  !*** ./src/scripts/js/modules/authentication/user-manager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserManager)
/* harmony export */ });
class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  addUser(user) {
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  findUser(email, password) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/authentication/user.js":
/*!*******************************************************!*\
  !*** ./src/scripts/js/modules/authentication/user.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor(name, email, number, password) {
    this.name = name;
    this.email = email;
    this.number = number;
    this.password = password;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/cart.js":
/*!****************************************!*\
  !*** ./src/scripts/js/modules/cart.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cart: () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ "./src/scripts/js/modules/product.js");


class Cart {
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
      const itemPicture = item.querySelector(`[class*="-picture"]`).src;
      const itemTitle = item.querySelector(`[class*="-title"]`).innerHTML;
      const itemPrice = item.querySelector(`[class*="-price"]`).innerHTML;
      const itemCategory = item.querySelector(`[class*="-category"]`).innerHTML;

      this.cartData[itemId] = [
        itemTitle,
        itemPicture,
        itemPrice,
        1,
        itemCategory,
      ];
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
          const product = new _product_js__WEBPACK_IMPORTED_MODULE_0__.Product(
            key,
            productData[0],
            productData[1],
            productData[2] * productData[3],
            productData[3],
            productData[4]
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
      button.addEventListener("click", () => {
        this.addItem(button.parentNode.parentNode.parentNode);
      });
    });
    minusItemButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.removeItem(button.parentNode.parentNode.parentNode);
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


/***/ }),

/***/ "./src/scripts/js/modules/category.js":
/*!********************************************!*\
  !*** ./src/scripts/js/modules/category.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
class Category {
  constructor(title, description, isDealsCategory = false) {
    this.title = title;
    this.description = description;
    this.isDealsCategory = isDealsCategory;
  }
  getTitleForProduct() {
    return `${this.title}`;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/product.js":
/*!*******************************************!*\
  !*** ./src/scripts/js/modules/product.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Product: () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _cart_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cart-handler.js */ "./src/scripts/js/cart-handler.js");


class Product {
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
        <p>Price: <span class="products__item-price">${this.price}</span>${_cart_handler_js__WEBPACK_IMPORTED_MODULE_0__.currency}</p>
        <p>Category: <span class="products__item-category">${this.category}</span></p>
        <button class="products__add-button btn btn-outline-primary">Add to Cart</button>
      </div>
    </div>`;
  }
  renderCartProduct() {
    return `
    <li class="cart__item" data-product-id="${this.id}">
      <img class="cart__item-picture" src="${this.picture}" alt="${this.name}">
      <div class="cart__group">
        <h3 class="cart__item-title">${this.name}</h3>
        <div class="cart__item-controls">
            <button class="btn btn-minus">-</button>
            <input type="number" class="form-control amount-input" disabled="" value="${this.amount}" name="amountInput">
            <button class="btn btn-add">+</button> 
        </div>
        <span class="cart__item-price mt-3">${this.price}${_cart_handler_js__WEBPACK_IMPORTED_MODULE_0__.currency}</span>
      </div>
    </li>`;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/products-loader.js":
/*!***************************************************!*\
  !*** ./src/scripts/js/modules/products-loader.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductsLoader: () => (/* binding */ ProductsLoader)
/* harmony export */ });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ "./src/scripts/js/modules/product.js");


class ProductsLoader {
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
        const newProduct = new _product_js__WEBPACK_IMPORTED_MODULE_0__.Product(
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


/***/ }),

/***/ "./src/scripts/js/scroll-top.js":
/*!**************************************!*\
  !*** ./src/scripts/js/scroll-top.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const scrollTopModule = () => {
  const scrollTopElement = $(".scroll-top");
  const screenOffset = 100;

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if (window.scrollY >= screenOffset) {
        scrollTopElement.addClass("active");
      } else {
        if (scrollTopElement.hasClass("active")) {
          scrollTopElement.toggleClass("active");
        }
      }
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollTopModule);


/***/ }),

/***/ "./src/scripts/js/site-loader.js":
/*!***************************************!*\
  !*** ./src/scripts/js/site-loader.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const siteLoaderModule = () => {
  $(document).ready(function () {
    $("body").addClass("loaded");
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siteLoaderModule);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_chat_bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/chat-bot */ "./src/scripts/js/chat-bot.js");
/* harmony import */ var _js_cart_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/cart-handler.js */ "./src/scripts/js/cart-handler.js");
/* harmony import */ var _js_header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/header.js */ "./src/scripts/js/header.js");
/* harmony import */ var _js_images_loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/images-loader.js */ "./src/scripts/js/images-loader.js");
/* harmony import */ var _js_scroll_top_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scroll-top.js */ "./src/scripts/js/scroll-top.js");
/* harmony import */ var _js_site_loader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/site-loader.js */ "./src/scripts/js/site-loader.js");
/* harmony import */ var _js_authentication_handler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/authentication-handler.js */ "./src/scripts/js/authentication-handler.js");
/* harmony import */ var _js_input_handlers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/input-handlers.js */ "./src/scripts/js/input-handlers.js");









AOS.init();

(0,_js_site_loader_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_js_chat_bot__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_js_header_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_js_images_loader_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_js_scroll_top_js__WEBPACK_IMPORTED_MODULE_4__["default"])();

(0,_js_input_handlers_js__WEBPACK_IMPORTED_MODULE_7__["default"])();

(0,_js_authentication_handler_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
(0,_js_cart_handler_js__WEBPACK_IMPORTED_MODULE_1__.cardHandler)();


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map