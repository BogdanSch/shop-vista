"use strict";

const headerOffset = 20;

window.addEventListener("scroll", (event) => {
  //   console.log(window.screenTop);
  //
  //   const rect = window.getBoundingClientRect();
  const header = $("header");
  if (window.scrollY >= headerOffset) {
    header.addClass("sticky");
  } else {
    if (header.hasClass("sticky")) {
      header.removeClass("sticky");
    }
  }
});
