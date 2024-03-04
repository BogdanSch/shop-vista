"use strict";

const phrases = [
  "Our manager will call you back soon!",
  "You can clarify the details by phone at 123456789",
  "Stay connected!",
  "Today is a beautiful weather!",
  "It's very pleasant to communicate with you!",
];
const hello = "Hey there!";
const goodBye = "Glad to talk to you. See you next time!";

$("#chatbot").on("click", function (event) {
  $(this).toggleClass("show");
});

$("#answers").append(`<div class="bot__answer">${hello}</div>`);

$("#questionInput, chatbot-submit").on("click", function () {
  return false;
});
