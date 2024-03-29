"use strict";

class Chatbot {
  #closeSvg = `<use xlink:href='#close'></use>`;
  #chatSvg = `<use xlink:href='#message'></use>`;
  constructor() {
    this.phrases = {
      main: [
        "Our manager will call you back soon!",
        "You can clarify the details by phone at 123456789",
        "Stay connected!",
        "Today is a beautiful weather!",
        "It's very pleasant to communicate with you!",
      ],
      hello: "Hey there!",
      bye: "Glad to talk to you. See you next time!",
      aboutStore:
        "Our online store offers a wide range of products at competitive prices.",
      contactInfo:
        "You can contact us at support@example.com or call us at 123-456-7890.",
      hoursOfOperation:
        "Our store is open Monday to Friday from 9:00 AM to 5:00 PM.",
    };

    this.chatbotElement = $(".chatbot__form");
    this.questionInput = $("#questionInput");
    this.answers = $("#answers");

    this.openChatbotButton = $(".chatbot__button");
    this.chatbotSvg = this.openChatbotButton.find(".chatbot__svg");

    this.isOpen = false;
  }

  init() {
    this.displayMessage("bot", this.phrases.hello);

    this.openChatbotButton.on("click", () => {
      this.isOpen = !this.isOpen
      let svgImage = this.isOpen ? this.#closeSvg : this.#chatSvg;
      this.chatbotElement.toggleClass("show");
      this.chatbotSvg.html(svgImage);
    });

    $("#questionInput, #chatbotSubmit").on("click", () => {
      return false;
    });

    $("#chatbotSubmit").on("click", () => {
      let question = this.questionInput.val().trim();

      if (!this.checkString(question)) {
        this.questionInput.val("");
        this.displayMessage("user", question);

        setTimeout(() => {
          if (question.toLowerCase().includes("bye")) {
            this.displayMessage("bot", this.phrases.bye);
          } else if (question.toLowerCase().includes("about")) {
            this.displayMessage("bot", this.phrases.aboutStore);
          } else if (question.toLowerCase().includes("contact")) {
            this.displayMessage("bot", this.phrases.contactInfo);
          } else if (question.toLowerCase().includes("hours") || question.toLowerCase().includes("open")) {
            this.displayMessage("bot", this.phrases.hoursOfOperation);
          } else {
            const randomIndex = Math.floor(
              Math.random() * this.phrases.main.length
            );
            this.displayMessage("bot", this.phrases.main[randomIndex]);
          }

          this.scrollToBottom(); // Scroll to bottom after displaying bot's response
        }, 1000);
      }
    });

    this.questionInput.keypress("keyup", this.enterKey);
  }

  displayMessage(user, message) {
    this.answers.append(`<div class="answers__${user}">${message}</div>`);
  }

  enterKey(event) {
    if (event.keyCode === 13) {
      $("#chatbotSubmit").click();
      return false;
    }
  }

  checkString(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  scrollToBottom() {
    this.chatbotElement.animate(
      {
        scrollTop: this.chatbotElement.prop("scrollHeight")
      },
      10
    );
  }
}

export default function chatbotModule() {
  const chatbot = new Chatbot();
  chatbot.init();
}
