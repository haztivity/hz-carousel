System.register(["@haztivity/core/index", "slick-carousel"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, HzCarousel, HzCarousel_1;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            HzCarousel = HzCarousel_1 = (function (_super) {
                __extends(HzCarousel, _super);
                /**
                 * Recurso para el componente Slick
                 * @param _$
                 * @param _EventEmitterFactory
                 * @param _DataOptions
                 * @see https://github.com/kenwheeler/slick
                 */
                function HzCarousel(_$, _EventEmitterFactory, _DataOptions) {
                    var _this = _super.call(this, _$, _EventEmitterFactory) || this;
                    _this._DataOptions = _DataOptions;
                    return _this;
                }
                HzCarousel.prototype.init = function (options, config) {
                    this._options = options;
                    this._config = config;
                    this._assignEvents();
                    this.refresh();
                };
                /**
                 * Asigna los manejadores de eventos
                 * @private
                 */
                HzCarousel.prototype._assignEvents = function () {
                    this._$element.off("." + HzCarousel_1.NAMESPACE)
                        .on(HzCarousel_1.ON_SLICK_AFTER_CHANGE + "." + HzCarousel_1.NAMESPACE, { instance: this }, this._onSlickAfterChange)
                        .on(HzCarousel_1.ON_SLICK_INIT + "." + HzCarousel_1.NAMESPACE + " " + HzCarousel_1.ON_SLICK_REINIT + "." + HzCarousel_1.NAMESPACE, { instance: this }, this._onSlickInit);
                };
                /**
                 * Invocado al inicializarse o actualizarse slick. Guarda la instancia de slick
                 * @param e
                 * @param slick
                 * @private
                 */
                HzCarousel.prototype._onSlickInit = function (e, slick) {
                    var instance = e.data.instance;
                    instance._slickInstance = slick;
                    slick.goTo(slick.options.initialSlide);
                };
                /**
                 * Crea los estados de las slides para el control de visualización
                 * @private
                 */
                HzCarousel.prototype._createState = function () {
                    this._visitedCount = 1; //the first slide is visited by default
                    this._slideState = [];
                    var count = this._slickInstance.slideCount;
                    for (var slideIndex = 0; slideIndex < count; slideIndex++) {
                        this._slideState.push({
                            visited: false
                        });
                    }
                };
                /**
                 * Invocado tras finalizar la activación de una slide. Actualiza el estado de la slide
                 * @param e
                 * @param slickInstance
                 * @param slideIndex
                 * @private
                 */
                HzCarousel.prototype._onSlickAfterChange = function (e, slickInstance, slideIndex) {
                    var instance = e.data.instance;
                    instance._updateSlideState(slideIndex);
                };
                /**
                 * Actualiza el estado de la slide. Si todas las slides se han visualizado se establece el recurso como finalizado
                 * @param slideIndex
                 * @private
                 */
                HzCarousel.prototype._updateSlideState = function (slideIndex) {
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
                HzCarousel.prototype.refresh = function () {
                    if (this._slickInstance) {
                        this._$element.slick("unslick");
                    }
                    var slickOptions = this._DataOptions.getDataOptions(this._$element, HzCarousel_1.SLICK_PREFIX);
                    slickOptions = index_1.$.extend(true, {}, HzCarousel_1._SLICK_DEFAULTS, slickOptions);
                    //see the page of slick to know all posible options
                    this._slickOptions = slickOptions;
                    this._$element.slick(slickOptions);
                    this._createState();
                };
                HzCarousel.prototype.getInstance = function () {
                    return this._slickInstance;
                };
                return HzCarousel;
            }(index_1.ResourceController));
            HzCarousel.NAMESPACE = "hzCarousel";
            HzCarousel.ON_SLICK_AFTER_CHANGE = "afterChange";
            HzCarousel.ON_SLICK_INIT = "init";
            HzCarousel.ON_SLICK_REINIT = "reInit";
            HzCarousel.SLICK_PREFIX = "slick";
            HzCarousel._SLICK_DEFAULTS = {
                adaptiveHeight: true,
                infinite: false,
                initialSlide: 0
            };
            HzCarousel = HzCarousel_1 = __decorate([
                index_1.Resource({
                    name: "HzCarousel",
                    dependencies: [
                        index_1.$,
                        index_1.EventEmitterFactory,
                        index_1.DataOptions
                    ]
                })
            ], HzCarousel);
            exports_1("HzCarousel", HzCarousel);
        }
    };
});
//# sourceMappingURL=HzCarousel.js.map