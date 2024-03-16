"use strict";

const scrollTopModule = () => {
  const scrollTop = $(".scroll-top");
  const screenOffset = 100;

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if (window.scrollY >= screenOffset) {
        scrollTop.addClass("active");
      } else {
        if (scrollTop.hasClass("active")) {
          scrollTop.toggleClass("active");
        }
      }
    });
  });
};

export default scrollTopModule;
