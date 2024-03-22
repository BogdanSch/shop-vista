"use strict";

const contactFormModule = () => {
    (function ($, undefined) {
        const userPhone = $(".contact__form #phone");
        if (userPhone) {
            userPhone.mask("+999 (99) 999 99 99", { placeholder: "" });
        }
    })(jQuery);
}

export default contactFormModule;
