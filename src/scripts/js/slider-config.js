"use strict";

import app from "./modules/rc-slider/main.js";

const sliderModule = () => {
  const sliderConfig = {
    imagePathes: [
      "./assets/images/store-open.jpg",
      "./assets/images/conversations.jpg",
      "./assets/images/customer-service.jpg",
      "./assets/images/laptop-typing.jpg",
    ],
    showMiniatures: false,
    animationDuration: 1000,
    autoplayDuration: 3000,
  };
  app(sliderConfig);
};

export default sliderModule;
