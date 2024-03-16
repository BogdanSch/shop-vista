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
  get name() {
    return this.name;
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

class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUser(user) {
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  findUser(username, password) {
    return this.users.find(
      (user) => user.username === username && user.password === password
    );
  }
}

const userManager = new UserManager();

function signIn(username, password) {
  let user = userManager.findUser(username, password);

  if (user) {
    const loginCookie = new Cookie("loggedInUser", username, 7);
    console.log("Sign in successful");
    return true;
  } else {
    console.log("Invalid username or password");
    return false;
  }
}

function signUp(username, password) {
  users.push({ username: username, password: password });
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
} else if (body.dataset.svPage === "sign-up") {
  const signUpForm = document.querySelector("#signUpForm");
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
