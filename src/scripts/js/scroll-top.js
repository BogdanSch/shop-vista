"use strict";

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

export default scrollTopModule;
