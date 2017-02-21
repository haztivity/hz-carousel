(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HzCarouselResource", "./HzCarouselResource"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var HzCarouselResource_1 = require("./HzCarouselResource");
    exports.HzCarouselResource = HzCarouselResource_1.HzCarouselResource;
    /**
     * @deprecated
     */
    var HzCarouselResource_2 = require("./HzCarouselResource");
    exports.HzCarousel = HzCarouselResource_2.HzCarouselResource;
});
//# sourceMappingURL=HzCarousel.js.map