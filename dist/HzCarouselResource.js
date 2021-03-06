"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
require("slick-carousel");
var HzCarouselResource = /** @class */ (function (_super) {
    __extends(HzCarouselResource, _super);
    /**
     * Recurso para el componente Slick
     * @param _$
     * @param _EventEmitterFactory
     * @param _DataOptions
     * @see https://github.com/kenwheeler/slick
     */
    function HzCarouselResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzCarouselResource_1 = HzCarouselResource;
    HzCarouselResource.prototype.init = function (options, config) {
        this._options = options;
        this._config = config;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
        this._assignEvents();
        this.refresh();
    };
    HzCarouselResource.prototype._onPageShown = function (e) {
        var instance = e.data.instance;
        if (instance._slickInstance) {
            instance._$element.slick("setPosition");
        }
    };
    /**
     * Asigna los manejadores de eventos
     * @private
     */
    HzCarouselResource.prototype._assignEvents = function () {
        this._eventEmitter.globalEmitter.on(core_1.PageController.ON_SHOWN, { instance: this }, this._onPageShown);
        this._$element.off("." + HzCarouselResource_1.NAMESPACE)
            .on(HzCarouselResource_1.ON_SLICK_BEFORE_CHANGE + "." + HzCarouselResource_1.NAMESPACE, { instance: this }, this._onSlickBeforeChange)
            .on(HzCarouselResource_1.ON_SLICK_AFTER_CHANGE + "." + HzCarouselResource_1.NAMESPACE, { instance: this }, this._onSlickAfterChange)
            .on(HzCarouselResource_1.ON_SLICK_INIT + "." + HzCarouselResource_1.NAMESPACE + " " + HzCarouselResource_1.ON_SLICK_REINIT + "." + HzCarouselResource_1.NAMESPACE, { instance: this }, this._onSlickInit);
    };
    HzCarouselResource.prototype._onSlickBeforeChange = function (e, slick, currentIndex, newIndex) {
        var instance = e.data.instance;
        //update the state of the dot if exists
        if (slick.$dots) {
            var $dot = slick.$dots.children().eq(newIndex);
            $dot.addClass(HzCarouselResource_1.CLASS_ACTIVED);
        }
    };
    /**
     * Invocado al inicializarse o actualizarse slick. Guarda la instancia de slick
     * @param e
     * @param slick
     * @private
     */
    HzCarouselResource.prototype._onSlickInit = function (e, slick) {
        var instance = e.data.instance;
        instance._slickInstance = slick;
        slick.goTo(slick.options.initialSlide);
    };
    /**
     * Crea los estados de las slides para el control de visualización
     * @private
     */
    HzCarouselResource.prototype._createState = function () {
        this._visitedCount = 0;
        this._slideState = [];
        var count = this._slickInstance.slideCount;
        for (var slideIndex = 0; slideIndex < count; slideIndex++) {
            this._slideState.push({
                visited: false
            });
        }
        //update the state of the initial slide
        this._updateSlideState(this._slickInstance.initialSlide);
    };
    /**
     * Invocado tras finalizar la activación de una slide. Actualiza el estado de la slide
     * @param e
     * @param slickInstance
     * @param slideIndex
     * @private
     */
    HzCarouselResource.prototype._onSlickAfterChange = function (e, slickInstance, slideIndex) {
        var instance = e.data.instance;
        instance._updateSlideState(slideIndex);
    };
    /**
     * Actualiza el estado de la slide. Si todas las slides se han visualizado se establece el recurso como finalizado
     * @param slideIndex
     * @private
     */
    HzCarouselResource.prototype._updateSlideState = function (slideIndex) {
        var slideState = this._slideState[slideIndex];
        if (slideState) {
            if (slideState.visited !== true) {
                slideState.visited = true;
                this._visitedCount++;
                if (this._visitedCount === this._slickInstance.slideCount) {
                    this._markAsCompleted();
                }
            }
        }
    };
    /**
     * Re inicializa slick
     */
    HzCarouselResource.prototype.refresh = function () {
        if (this._slickInstance) {
            this._$element.slick("unslick");
        }
        var slickOptions = this._DataOptions.getDataOptions(this._$element, HzCarouselResource_1.SLICK_PREFIX);
        slickOptions = core_1.$.extend(true, {}, HzCarouselResource_1._SLICK_DEFAULTS, slickOptions);
        //see the page of slick to know all posible options
        this._slickOptions = slickOptions;
        this._$element.slick(slickOptions);
        this._createState();
    };
    HzCarouselResource.prototype.getInstance = function () {
        return this._slickInstance;
    };
    HzCarouselResource.NAMESPACE = "HzCarouselResource";
    HzCarouselResource.ON_SLICK_AFTER_CHANGE = "afterChange";
    HzCarouselResource.ON_SLICK_BEFORE_CHANGE = "beforeChange";
    HzCarouselResource.ON_SLICK_INIT = "init";
    HzCarouselResource.ON_SLICK_REINIT = "reInit";
    HzCarouselResource.CLASS_ACTIVED = "hz-carousel--actived";
    HzCarouselResource.SLICK_PREFIX = "slick";
    HzCarouselResource._SLICK_DEFAULTS = {
        adaptiveHeight: true,
        infinite: false,
        initialSlide: 0
    };
    HzCarouselResource = HzCarouselResource_1 = __decorate([
        core_1.Resource({
            name: "HzCarousel",
            dependencies: [
                core_1.$,
                core_1.EventEmitterFactory,
                core_1.DataOptions
            ]
        })
    ], HzCarouselResource);
    return HzCarouselResource;
    var HzCarouselResource_1;
}(core_1.ResourceController));
exports.HzCarouselResource = HzCarouselResource;
//# sourceMappingURL=HzCarouselResource.js.map