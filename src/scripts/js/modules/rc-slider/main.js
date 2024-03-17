/* 
RC Slider
Version: 1.0
This plugin doesn't require any extra library
*/

import { Slider } from "./slider.js";

const app = (sliderConfig) => {
  const slider = new Slider(sliderConfig);
  slider.init();
};

export default app;
