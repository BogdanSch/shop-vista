"use strict";

const headerOffset = 20;

window.addEventListener("scroll", (event) => {
  const header = $("header");
  if (window.scrollY >= headerOffset) {
    header.addClass("sticky");
  } else {
    if (header.hasClass("sticky")) {
      header.removeClass("sticky");
    }
  }
});
