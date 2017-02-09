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
    var index_1, HzCarouselResource, HzCarouselResource_1;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            HzCarouselResource = HzCarouselResource_1 = (function (_super) {
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
                HzCarouselResource.prototype.init = function (options, config) {
                    this._options = options;
                    this._config = config;
                    this._assignEvents();
                    this.refresh();
                };
                /**
                 * Asigna los manejadores de eventos
                 * @private
                 */
                HzCarouselResource.prototype._assignEvents = function () {
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
                    slickOptions = index_1.$.extend(true, {}, HzCarouselResource_1._SLICK_DEFAULTS, slickOptions);
                    //see the page of slick to know all posible options
                    this._slickOptions = slickOptions;
                    this._$element.slick(slickOptions);
                    this._createState();
                };
                HzCarouselResource.prototype.getInstance = function () {
                    return this._slickInstance;
                };
                return HzCarouselResource;
            }(index_1.ResourceController));
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
                index_1.Resource({
                    name: "HzCarousel",
                    dependencies: [
                        index_1.$,
                        index_1.EventEmitterFactory,
                        index_1.DataOptions
                    ]
                })
            ], HzCarouselResource);
            exports_1("HzCarouselResource", HzCarouselResource);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHpDYXJvdXNlbFJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSHpDYXJvdXNlbFJlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTBCYSxrQkFBa0I7Z0JBQVMsc0NBQWtCO2dCQWtCdEQ7Ozs7OzttQkFNRztnQkFDSCw0QkFBWSxFQUFnQixFQUFFLG9CQUF5QyxFQUFZLFlBQVk7b0JBQS9GLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLG9CQUFvQixDQUFDLFNBQ2xDO29CQUZrRixrQkFBWSxHQUFaLFlBQVksQ0FBQTs7Z0JBRS9GLENBQUM7Z0JBRU0saUNBQUksR0FBWCxVQUFZLE9BQVksRUFBRSxNQUFZO29CQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztvQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ08sMENBQWEsR0FBdkI7b0JBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLG9CQUFrQixDQUFDLFNBQVMsQ0FBQzt5QkFDakQsRUFBRSxDQUNJLG9CQUFrQixDQUFDLHNCQUFzQixTQUFJLG9CQUFrQixDQUFDLFNBQVcsRUFDOUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FDNUI7eUJBQ0EsRUFBRSxDQUNJLG9CQUFrQixDQUFDLHFCQUFxQixTQUFJLG9CQUFrQixDQUFDLFNBQVcsRUFDN0UsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FDM0I7eUJBQ0EsRUFBRSxDQUNJLG9CQUFrQixDQUFDLGFBQWEsU0FBSSxvQkFBa0IsQ0FBQyxTQUFTLFNBQUksb0JBQWtCLENBQUMsZUFBZSxTQUFJLG9CQUFrQixDQUFDLFNBQVcsRUFDM0ksRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQ2hCLElBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7Z0JBQ1YsQ0FBQztnQkFDUyxpREFBb0IsR0FBOUIsVUFBK0IsQ0FBQyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUTtvQkFDeEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQy9CLHVDQUF1QztvQkFDdkMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQ1osSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BELENBQUM7Z0JBQ0wsQ0FBQztnQkFDRDs7Ozs7bUJBS0c7Z0JBQ08seUNBQVksR0FBdEIsVUFBdUIsQ0FBQyxFQUFFLEtBQUs7b0JBQzNCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMvQixRQUFRLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ08seUNBQVksR0FBdEI7b0JBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztvQkFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pCOzRCQUNJLE9BQU8sRUFBRSxLQUFLO3lCQUNqQixDQUNKLENBQUM7b0JBQ04sQ0FBQztvQkFDRCx1Q0FBdUM7b0JBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVEOzs7Ozs7bUJBTUc7Z0JBQ08sZ0RBQW1CLEdBQTdCLFVBQThCLENBQUMsRUFBRSxhQUFhLEVBQUUsVUFBVTtvQkFDdEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQy9CLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDTyw4Q0FBaUIsR0FBM0IsVUFBNEIsVUFBVTtvQkFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQzt3QkFDWCxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7NEJBQzVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzRCQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO2dDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs0QkFDNUIsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0ksb0NBQU8sR0FBZDtvQkFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDckcsWUFBWSxHQUFHLFNBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxvQkFBa0IsQ0FBQyxlQUFlLEVBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ2pGLG1EQUFtRDtvQkFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRU0sd0NBQVcsR0FBbEI7b0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0wseUJBQUM7WUFBRCxDQUFDLEFBakpELENBQXdDLDBCQUFrQixHQWlKekQ7WUFoSjBCLDRCQUFTLEdBQUcsb0JBQW9CLENBQUM7WUFDakMsd0NBQXFCLEdBQUcsYUFBYSxDQUFDO1lBQ3RDLHlDQUFzQixHQUFHLGNBQWMsQ0FBQztZQUN4QyxnQ0FBYSxHQUFHLE1BQU0sQ0FBQztZQUN2QixrQ0FBZSxHQUFHLFFBQVEsQ0FBQztZQUMzQixnQ0FBYSxHQUFHLHNCQUFzQixDQUFDO1lBQ3BDLCtCQUFZLEdBQUcsT0FBTyxDQUFDO1lBS3ZCLGtDQUFlLEdBQUc7Z0JBQ3hDLGNBQWMsRUFBQyxJQUFJO2dCQUNuQixRQUFRLEVBQUMsS0FBSztnQkFDZCxZQUFZLEVBQUMsQ0FBQzthQUNqQixDQUFDO1lBaEJPLGtCQUFrQjtnQkFWOUIsZ0JBQVEsQ0FDTDtvQkFDSSxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsWUFBWSxFQUFFO3dCQUNWLFNBQUM7d0JBQ0QsMkJBQW1CO3dCQUNuQixtQkFBVztxQkFDZDtpQkFDSixDQUNKO2VBQ1ksa0JBQWtCLENBaUo5Qjs7UUFDRCxDQUFDIn0=