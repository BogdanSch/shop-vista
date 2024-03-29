import chatbotModule from "./js/chat-bot";
import { cardHandler, categories, currency } from "./js/cart-handler.js";
import headerModule from "./js/header.js";
import imagesLoaderModule from "./js/images-loader.js";
import scrollTopModule from "./js/scroll-top.js";
import siteLoaderModule from "./js/site-loader.js";
import authenticationHandlerModule from "./js/authentication-handler.js";
import inputHandlers from "./js/input-handlers.js"

AOS.init();

siteLoaderModule();
chatbotModule();
headerModule();
imagesLoaderModule();
scrollTopModule();

inputHandlers();

authenticationHandlerModule();
cardHandler();

