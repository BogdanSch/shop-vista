"use strict";

const body = document.body;

// class CookieManager {
//   constructor() {
//     this.cookies = {};
//     this.parseCookies();
//   }

//   parseCookies() {
//     const cookieString = document.cookie;
//     if (cookieString !== "") {
//       const cookieArray = cookieString.split("; ");
//       cookieArray.forEach((cookie) => {
//         const [name, value] = cookie.split("=");
//         this.cookies[name] = value;
//       });
//     }
//   }

//   getCookie(name) {
//     return this.cookies[name];
//   }

//   setCookie(name, value, options = {}) {
//     let cookieString = `${name}=${value}`;
//     if (options.expires) {
//       const expires = new Date(options.expires).toUTCString();
//       cookieString += `; expires=${expires}`;
//     }
//     if (options.path) {
//       cookieString += `; path=${options.path}`;
//     }
//     document.cookie = cookieString;
//     this.cookies[name] = value;
//   }

//   deleteCookie(name) {
//     this.setCookie(name, "", { expires: new Date(0) });
//     delete this.cookies[name];
//   }
// }
class Cookie {
  constructor(name, value, expireDate) {
    this.name = name;
    this.value = value;
    this.expireDate = expireDate;
  }
  initCookie() {
    let cookieString = `${this.name}=${this.value}`;
    const expires = new Date(this.expireDate).toUTCString();
    cookieString += `; expires=${expires}`;
    document.cookie = cookieString;
  }
  deleteCookie() {
    this.setCookie(this.name, "", { expires: new Date(0) });
    delete this.cookies[this.name];
  }
  getAllCookies() {
    const cookieString = document.cookie;
    let cookies = {};
    if (cookieString !== "") {
      const cookieArray = cookieString.split("; ");
      cookieArray.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookies[name] = value;
      });
    }
    return cookies;
  }
  static checkCookie(name) {
    const allCookies = this.getAllCookies();
    return this.cookies[name] !== null;
  }
}

class User {
  constructor(name, email, number, password) {
    this.name = name;
    this.email = email;
    this.number = number;
    this.password = password;
  }
}

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

const userManager = new UserManager();
let loginCookie = null;

function signIn(email, password) {
  let user = userManager.findUser(email, password);

  if (user) {
    loginCookie = new Cookie("loggedInUser", email, 7);
    console.log("Sign in successful");
    return true;
  } else {
    console.log("Invalid username or password");
    return false;
  }
}

function signUp(name, email, number, password) {
  const user = new User(name, email, number, password);
  userManager.addUser(user);
  loginCookie = new Cookie("loggedInUser", email, 7);
  console.log("Sign up successful");
}

// let loggedInUser = CookieManager.getCookie("loggedInUser");
// if (loggedInUser) {
//   console.log("Logged in user:", loggedInUser);
// } else {
//   console.log("No user logged in");
// }

if (body.dataset.svPage === "sign-in") {
  const signInForm = document.querySelector("#signInForm");
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = signInForm.querySelector("#inputEmail").value;
    const password = signInForm.querySelector("#inputPassword").value;
    return signIn(email, password);
  });
} else if (body.dataset.svPage === "sign-up") {
  const signUpForm = document.querySelector("#signUpForm");
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = signUpForm.querySelector("#inputName").value;
    const email = signUpForm.querySelector("#inputEmail").value;
    const number = signUpForm.querySelector("#inputNumber").value;
    const password = signUpForm.querySelector("#inputPassword").value;
    signUp(name, email, number, password);
  });
}
