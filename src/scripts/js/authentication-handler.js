"use strict";

import User from "./modules/authentication/user.js";
import UserManager from "./modules/authentication/user-manager.js";
import Cookie from "./modules/authentication/cookie.js";

const authenticationHandlerModule = () => {
  const body = document.body;
  const loggedInUserCookieName = "loggedInUser";
  const cookieLifeDuration = new Date();
  cookieLifeDuration.setTime(cookieLifeDuration.getTime() + (2 * 3600 * 1000));

  const userManager = new UserManager();
  let loginCookie = Cookie.get(loggedInUserCookieName);

  const signIn = (email, password) => {
    const user = userManager.findUser(email, password);
    if (user) {
      new Cookie(loggedInUserCookieName, email, cookieLifeDuration);
      return true;
    } else {
      return false;
    }
  };

  const signUp = (name, email, number, password) => {
    const user = new User(name, email, number, password);
    userManager.addUser(user);
    new Cookie(loggedInUserCookieName, email, cookieLifeDuration);
  };

  const handleSignInForm = () => {
    const signInForm = $("#signInForm");
    signInForm.on("submit", (event) => {
      event.preventDefault();
      const email = signInForm.find("#inputEmail").val();
      const password = signInForm.find("#inputPassword").val();
      if (signIn(email, password)) window.location.assign("./index.html");
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
      window.location.assign("./index.html");
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
          Cookie.delete(loggedInUserCookieName);
          window.location.assign("./index.html");
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

export default authenticationHandlerModule;
