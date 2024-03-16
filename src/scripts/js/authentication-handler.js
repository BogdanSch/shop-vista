"use strict";

import User from "./modules/authentication/user.js";
import UserManager from "./modules/authentication/user-manager.js";
import Cookie from "./modules/authentication/cookie.js";

const authenticationHandlerModule = () => {
  const body = document.body;

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
  console.log("im working!");

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
      return true;
    });
  } else {
    if (Cookie.checkCookie(loginCookie?.name)) {
      $(".header .profile__dropdown").html(
        `<li><button class="btn brn-log-out dropdown-item">Log out</button></li>`
      );
      $(".header .profile__dropdown .brn-log-out").on(
        "click",
        function (event) {
          loginCookie?.deleteCookie();
        }
      );
    } else {
      $(".header .profile__dropdown")
        .html(`<li><a class="dropdown-item" href="./sign-in.html">Sign in</a></li>
      <li>
          <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="./sign-up.html">Sign up</a></li>`);
    }
  }
};

export default authenticationHandlerModule;
