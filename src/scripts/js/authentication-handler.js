"use strict";

import User from "./modules/authentication/user.js";
import UserManager from "./modules/authentication/user-manager.js";
import Cookie from "./modules/authentication/cookie.js";

const authenticationHandlerModule = () => {
  const body = document.body;
  const loggedInUserCookieName = "loggedInUser";
  const cookieLifeDuration = new Date() + 2 * 3600000;

  const userManager = new UserManager();
  let loginCookie = null;

  if (Cookie.checkCookie(loggedInUserCookieName)) {
    loginCookie = Cookie.getCookie(loggedInUserCookieName);
  }

  function signIn(email, password) {
    let user = userManager.findUser(email, password);

    if (user) {
      loginCookie = new Cookie("loggedInUser", email, cookieLifeDuration);
      return true;
    } else {
      return false;
    }
  }

  function signUp(name, email, number, password) {
    const user = new User(name, email, number, password);
    userManager.addUser(user);
    loginCookie = new Cookie("loggedInUser", email, cookieLifeDuration);
  }

  if (body.dataset.svPage === "sign-in") {
    const signInForm = $("#signInForm");
    signInForm.on("submit", (event) => {
      event.preventDefault();
      const email = signInForm.find("#inputEmail").val();
      const password = signInForm.find("#inputPassword").val();
      if (signIn(email, password)) location.href = "index.html";
      return false;
    });
  } else if (body.dataset.svPage === "sign-up") {
    const signUpForm = $("#signUpForm");
    signUpForm.on("submit", (event) => {
      event.preventDefault();
      const name = signUpForm.find("#inputName").val();
      const email = signUpForm.find("#inputEmail").val();
      const number = signUpForm.find("#inputNumber").val();
      const password = signUpForm.find("#inputPassword").val();
      signUp(name, email, number, password);
      location.href = "index.html";
    });
  } else {
    if (loginCookie !== null) {
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
