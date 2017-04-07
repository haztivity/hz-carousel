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
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("@haztivity/core/index");
require("slick-carousel");
var HzCarouselResource = HzCarouselResource_1 = (function (_super) {
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
exports.HzCarouselResource = HzCarouselResource;
var HzCarouselResource_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIekNhcm91c2VsUmVzb3VyY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xudmFyIGluZGV4XzEgPSByZXF1aXJlKFwiQGhhenRpdml0eS9jb3JlL2luZGV4XCIpO1xucmVxdWlyZShcInNsaWNrLWNhcm91c2VsXCIpO1xudmFyIEh6Q2Fyb3VzZWxSZXNvdXJjZSA9IEh6Q2Fyb3VzZWxSZXNvdXJjZV8xID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSHpDYXJvdXNlbFJlc291cmNlLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIFJlY3Vyc28gcGFyYSBlbCBjb21wb25lbnRlIFNsaWNrXG4gICAgICogQHBhcmFtIF8kXG4gICAgICogQHBhcmFtIF9FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICogQHBhcmFtIF9EYXRhT3B0aW9uc1xuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIekNhcm91c2VsUmVzb3VyY2UoXyQsIF9FdmVudEVtaXR0ZXJGYWN0b3J5LCBfRGF0YU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXyQsIF9FdmVudEVtaXR0ZXJGYWN0b3J5KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fRGF0YU9wdGlvbnMgPSBfRGF0YU9wdGlvbnM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSHpDYXJvdXNlbFJlc291cmNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbmZpZykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLl9hc3NpZ25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBc2lnbmEgbG9zIG1hbmVqYWRvcmVzIGRlIGV2ZW50b3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEh6Q2Fyb3VzZWxSZXNvdXJjZS5wcm90b3R5cGUuX2Fzc2lnbkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fJGVsZW1lbnQub2ZmKFwiLlwiICsgSHpDYXJvdXNlbFJlc291cmNlXzEuTkFNRVNQQUNFKVxuICAgICAgICAgICAgLm9uKEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLk9OX1NMSUNLX0JFRk9SRV9DSEFOR0UgKyBcIi5cIiArIEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLk5BTUVTUEFDRSwgeyBpbnN0YW5jZTogdGhpcyB9LCB0aGlzLl9vblNsaWNrQmVmb3JlQ2hhbmdlKVxuICAgICAgICAgICAgLm9uKEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLk9OX1NMSUNLX0FGVEVSX0NIQU5HRSArIFwiLlwiICsgSHpDYXJvdXNlbFJlc291cmNlXzEuTkFNRVNQQUNFLCB7IGluc3RhbmNlOiB0aGlzIH0sIHRoaXMuX29uU2xpY2tBZnRlckNoYW5nZSlcbiAgICAgICAgICAgIC5vbihIekNhcm91c2VsUmVzb3VyY2VfMS5PTl9TTElDS19JTklUICsgXCIuXCIgKyBIekNhcm91c2VsUmVzb3VyY2VfMS5OQU1FU1BBQ0UgKyBcIiBcIiArIEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLk9OX1NMSUNLX1JFSU5JVCArIFwiLlwiICsgSHpDYXJvdXNlbFJlc291cmNlXzEuTkFNRVNQQUNFLCB7IGluc3RhbmNlOiB0aGlzIH0sIHRoaXMuX29uU2xpY2tJbml0KTtcbiAgICB9O1xuICAgIEh6Q2Fyb3VzZWxSZXNvdXJjZS5wcm90b3R5cGUuX29uU2xpY2tCZWZvcmVDaGFuZ2UgPSBmdW5jdGlvbiAoZSwgc2xpY2ssIGN1cnJlbnRJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gZS5kYXRhLmluc3RhbmNlO1xuICAgICAgICAvL3VwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIGRvdCBpZiBleGlzdHNcbiAgICAgICAgaWYgKHNsaWNrLiRkb3RzKSB7XG4gICAgICAgICAgICB2YXIgJGRvdCA9IHNsaWNrLiRkb3RzLmNoaWxkcmVuKCkuZXEobmV3SW5kZXgpO1xuICAgICAgICAgICAgJGRvdC5hZGRDbGFzcyhIekNhcm91c2VsUmVzb3VyY2VfMS5DTEFTU19BQ1RJVkVEKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSW52b2NhZG8gYWwgaW5pY2lhbGl6YXJzZSBvIGFjdHVhbGl6YXJzZSBzbGljay4gR3VhcmRhIGxhIGluc3RhbmNpYSBkZSBzbGlja1xuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHBhcmFtIHNsaWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBIekNhcm91c2VsUmVzb3VyY2UucHJvdG90eXBlLl9vblNsaWNrSW5pdCA9IGZ1bmN0aW9uIChlLCBzbGljaykge1xuICAgICAgICB2YXIgaW5zdGFuY2UgPSBlLmRhdGEuaW5zdGFuY2U7XG4gICAgICAgIGluc3RhbmNlLl9zbGlja0luc3RhbmNlID0gc2xpY2s7XG4gICAgICAgIHNsaWNrLmdvVG8oc2xpY2sub3B0aW9ucy5pbml0aWFsU2xpZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYSBsb3MgZXN0YWRvcyBkZSBsYXMgc2xpZGVzIHBhcmEgZWwgY29udHJvbCBkZSB2aXN1YWxpemFjacOzblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgSHpDYXJvdXNlbFJlc291cmNlLnByb3RvdHlwZS5fY3JlYXRlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Zpc2l0ZWRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX3NsaWRlU3RhdGUgPSBbXTtcbiAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5fc2xpY2tJbnN0YW5jZS5zbGlkZUNvdW50O1xuICAgICAgICBmb3IgKHZhciBzbGlkZUluZGV4ID0gMDsgc2xpZGVJbmRleCA8IGNvdW50OyBzbGlkZUluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlU3RhdGUucHVzaCh7XG4gICAgICAgICAgICAgICAgdmlzaXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vdXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgaW5pdGlhbCBzbGlkZVxuICAgICAgICB0aGlzLl91cGRhdGVTbGlkZVN0YXRlKHRoaXMuX3NsaWNrSW5zdGFuY2UuaW5pdGlhbFNsaWRlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludm9jYWRvIHRyYXMgZmluYWxpemFyIGxhIGFjdGl2YWNpw7NuIGRlIHVuYSBzbGlkZS4gQWN0dWFsaXphIGVsIGVzdGFkbyBkZSBsYSBzbGlkZVxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHBhcmFtIHNsaWNrSW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gc2xpZGVJbmRleFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgSHpDYXJvdXNlbFJlc291cmNlLnByb3RvdHlwZS5fb25TbGlja0FmdGVyQ2hhbmdlID0gZnVuY3Rpb24gKGUsIHNsaWNrSW5zdGFuY2UsIHNsaWRlSW5kZXgpIHtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gZS5kYXRhLmluc3RhbmNlO1xuICAgICAgICBpbnN0YW5jZS5fdXBkYXRlU2xpZGVTdGF0ZShzbGlkZUluZGV4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFjdHVhbGl6YSBlbCBlc3RhZG8gZGUgbGEgc2xpZGUuIFNpIHRvZGFzIGxhcyBzbGlkZXMgc2UgaGFuIHZpc3VhbGl6YWRvIHNlIGVzdGFibGVjZSBlbCByZWN1cnNvIGNvbW8gZmluYWxpemFkb1xuICAgICAqIEBwYXJhbSBzbGlkZUluZGV4XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBIekNhcm91c2VsUmVzb3VyY2UucHJvdG90eXBlLl91cGRhdGVTbGlkZVN0YXRlID0gZnVuY3Rpb24gKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgdmFyIHNsaWRlU3RhdGUgPSB0aGlzLl9zbGlkZVN0YXRlW3NsaWRlSW5kZXhdO1xuICAgICAgICBpZiAoc2xpZGVTdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlU3RhdGUudmlzaXRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNsaWRlU3RhdGUudmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaXRlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2l0ZWRDb3VudCA9PT0gdGhpcy5fc2xpY2tJbnN0YW5jZS5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcmtBc0NvbXBsZXRlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmUgaW5pY2lhbGl6YSBzbGlja1xuICAgICAqL1xuICAgIEh6Q2Fyb3VzZWxSZXNvdXJjZS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NsaWNrSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LnNsaWNrKFwidW5zbGlja1wiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2xpY2tPcHRpb25zID0gdGhpcy5fRGF0YU9wdGlvbnMuZ2V0RGF0YU9wdGlvbnModGhpcy5fJGVsZW1lbnQsIEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLlNMSUNLX1BSRUZJWCk7XG4gICAgICAgIHNsaWNrT3B0aW9ucyA9IGluZGV4XzEuJC5leHRlbmQodHJ1ZSwge30sIEh6Q2Fyb3VzZWxSZXNvdXJjZV8xLl9TTElDS19ERUZBVUxUUywgc2xpY2tPcHRpb25zKTtcbiAgICAgICAgLy9zZWUgdGhlIHBhZ2Ugb2Ygc2xpY2sgdG8ga25vdyBhbGwgcG9zaWJsZSBvcHRpb25zXG4gICAgICAgIHRoaXMuX3NsaWNrT3B0aW9ucyA9IHNsaWNrT3B0aW9ucztcbiAgICAgICAgdGhpcy5fJGVsZW1lbnQuc2xpY2soc2xpY2tPcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhdGUoKTtcbiAgICB9O1xuICAgIEh6Q2Fyb3VzZWxSZXNvdXJjZS5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlja0luc3RhbmNlO1xuICAgIH07XG4gICAgcmV0dXJuIEh6Q2Fyb3VzZWxSZXNvdXJjZTtcbn0oaW5kZXhfMS5SZXNvdXJjZUNvbnRyb2xsZXIpKTtcbkh6Q2Fyb3VzZWxSZXNvdXJjZS5OQU1FU1BBQ0UgPSBcIkh6Q2Fyb3VzZWxSZXNvdXJjZVwiO1xuSHpDYXJvdXNlbFJlc291cmNlLk9OX1NMSUNLX0FGVEVSX0NIQU5HRSA9IFwiYWZ0ZXJDaGFuZ2VcIjtcbkh6Q2Fyb3VzZWxSZXNvdXJjZS5PTl9TTElDS19CRUZPUkVfQ0hBTkdFID0gXCJiZWZvcmVDaGFuZ2VcIjtcbkh6Q2Fyb3VzZWxSZXNvdXJjZS5PTl9TTElDS19JTklUID0gXCJpbml0XCI7XG5IekNhcm91c2VsUmVzb3VyY2UuT05fU0xJQ0tfUkVJTklUID0gXCJyZUluaXRcIjtcbkh6Q2Fyb3VzZWxSZXNvdXJjZS5DTEFTU19BQ1RJVkVEID0gXCJoei1jYXJvdXNlbC0tYWN0aXZlZFwiO1xuSHpDYXJvdXNlbFJlc291cmNlLlNMSUNLX1BSRUZJWCA9IFwic2xpY2tcIjtcbkh6Q2Fyb3VzZWxSZXNvdXJjZS5fU0xJQ0tfREVGQVVMVFMgPSB7XG4gICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIGluaXRpYWxTbGlkZTogMFxufTtcbkh6Q2Fyb3VzZWxSZXNvdXJjZSA9IEh6Q2Fyb3VzZWxSZXNvdXJjZV8xID0gX19kZWNvcmF0ZShbXG4gICAgaW5kZXhfMS5SZXNvdXJjZSh7XG4gICAgICAgIG5hbWU6IFwiSHpDYXJvdXNlbFwiLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgIGluZGV4XzEuJCxcbiAgICAgICAgICAgIGluZGV4XzEuRXZlbnRFbWl0dGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGluZGV4XzEuRGF0YU9wdGlvbnNcbiAgICAgICAgXVxuICAgIH0pXG5dLCBIekNhcm91c2VsUmVzb3VyY2UpO1xuZXhwb3J0cy5IekNhcm91c2VsUmVzb3VyY2UgPSBIekNhcm91c2VsUmVzb3VyY2U7XG52YXIgSHpDYXJvdXNlbFJlc291cmNlXzE7XG4iXSwiZmlsZSI6Ikh6Q2Fyb3VzZWxSZXNvdXJjZS5qcyJ9
