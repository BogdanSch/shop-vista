"use strict";

(function ($, undefined) {
    const userPhone = $(".contact__form #phone");
    if (userPhone) {
        userPhone.mask("+31 (0) 999 999 999", { placeholder: " " });
    }
})(jQuery);