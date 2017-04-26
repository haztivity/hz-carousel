/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, PageController,ResourceManager} from "@haztivity/core/index";
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jade";
import template from "./page.pug";
import {HzCarouselResource} from "../../../resources/hz-carousel/HzCarousel";
import "../../../resources/hz-carousel/assets/styles/hz-carousel.structure.scss";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6611",
        resources: [
            HzCarouselResource
        ],
        template: template,
        autoSequence:false
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);
