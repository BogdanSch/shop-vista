"use strict";

const inputHandlers = () => {
    (function ($, undefined) {
        const userPhone = $(".contact__form #phone, .auth__form #inputNumber, .check-out__form #phone");
        userPhone.mask("+380 (99) 999 9999", { placeholder: "" });

        const bankCardField = $(".check-out__form #cardNumber");
        bankCardField.mask("1234 1234 1234", { placeholder: "" });
    })(jQuery);
}

export default inputHandlers;
