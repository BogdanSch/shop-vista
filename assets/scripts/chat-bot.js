"use strict";

const phrases = {
  main: [
    "Our manager will call you back soon!",
    "You can clarify the details by phone at 123456789",
    "Stay connected!",
    "Today is a beautiful weather!",
    "It's very pleasant to communicate with you!",
  ],
  hello: "Hey there!",
  bye: "Glad to talk to you. See you next time!",
};

const questionInput = $("#questionInput");
const answers = $("#answers");

function displayMessage(user, message) {
  answers.append(`<div class="answer__${user}">${message}</div>`);
}

displayMessage("bot", phrases.hello);
// answers.append(`<div class="answer__bot">${hello}</div>`);

$("#chatbot").on("click", function (event) {
  $(this).toggleClass("show");
});
$("#questionInput, #chatbotSubmit").on("click", function () {
  return false;
});

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

$("#chatbotSubmit").on("click", function () {
  let question = questionInput.val().trim();

  if (!isEmptyOrSpaces(question)) {
    questionInput.val("");
    displayMessage("user", question);

    setTimeout(() => {
      if (question.toLowerCase().includes("bye")) {
        displayMessage("user", phrases.bye);
      }

      $("#chatbot").animate(
        {
          scrollTop: chatbot.scrollHeight - chatbot.clientHeight,
        },
        10
      );
    }, 1000);
  }
});

function enterKey(event) {
  if (event.keyCode === 13) {
    $("#chatbotSubmit").click();
    return false;
  }
}

questionInput.keypress("keyup", enterKey);
