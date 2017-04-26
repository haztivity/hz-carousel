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
        name: "6612",
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
page.on(
    PageController.ON_RENDERED, null, (eventObject, $page: JQuery, pageController: PageController) => {
        $page.find('#myCarousel').on('beforeChange', (event, slick, currentSlide, nextSlide)=>{
            alert(`Slide changing, current: ${currentSlide}, next: ${nextSlide}`);
            console.log(`Slide changing, current: ${currentSlide}, next: ${nextSlide}`);
        });
        let $myCarousel2 = $page.find('#myCarousel2');
        $page.find('#myCarousel2Next').on('click', (event, slick, currentSlide, nextSlide)=>{
            $myCarousel2.slick("slickNext");
        });
    }
);