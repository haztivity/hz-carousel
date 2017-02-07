System.register(["@haztivity/core/index", "./page.html!text", "../../../../../src/HzCarousel", "../../../../../src/assets/styles/hz-carousel.structure.css!"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, page_html_text_1, HzCarousel_1, page;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (page_html_text_1_1) {
                page_html_text_1 = page_html_text_1_1;
            },
            function (HzCarousel_1_1) {
                HzCarousel_1 = HzCarousel_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            exports_1("page", page = index_1.PageFactory.createPage({
                name: "6611",
                resources: [
                    HzCarousel_1.HzCarousel
                ],
                template: page_html_text_1.default
            }));
            page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
                console.log(pageController.options.name + " rendering");
            });
            page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " rendered");
            });
            page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show start");
            });
            page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show end");
            });
            page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
                console.log(pageController.options.name + " complete change");
            });
            page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " destroy");
            });
        }
    };
});
//# sourceMappingURL=page.js.map