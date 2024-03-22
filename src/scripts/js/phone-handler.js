"use strict";

const phoneNumberHandler = () => {
    (function ($, undefined) {
        const userPhone = $(".contact__form #phone, .auth__form #inputNumber");
        if (userPhone) {
            userPhone.mask("+999 (99) 999 99 99", { placeholder: "" });
        }
    })(jQuery);
}

export default phoneNumberHandler;
