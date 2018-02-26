/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {
    $,
    Resource,
    ResourceController,
    EventEmitterFactory,
    ScormService,
    DataOptions,
    EventEmitter,
    PageController
} from "@haztivity/core";
import "slick-carousel";
export interface ISlideState{
    visited:boolean;
}
@Resource(
    {
        name: "HzCarousel",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzCarouselResource extends ResourceController {
    public static readonly NAMESPACE = "HzCarouselResource";
    public static readonly ON_SLICK_AFTER_CHANGE = `afterChange`;
    public static readonly ON_SLICK_BEFORE_CHANGE = `beforeChange`;
    public static readonly ON_SLICK_INIT = "init";
    public static readonly ON_SLICK_REINIT = "reInit";
    public static readonly CLASS_ACTIVED = "hz-carousel--actived";
    protected static readonly SLICK_PREFIX = "slick";
    protected _eventEmitter:EventEmitter;
    protected _slickOptions: any;
    protected _slickInstance: any;
    protected _slideState:ISlideState[];
    protected _visitedCount:number;
    protected static readonly _SLICK_DEFAULTS = {
        adaptiveHeight:true,
        infinite:false,
        initialSlide:0
    };

    /**
     * Recurso para el componente Slick
     * @param _$
     * @param _EventEmitterFactory
     * @param _DataOptions
     * @see https://github.com/kenwheeler/slick
     */
    constructor(_$: JQueryStatic, _EventEmitterFactory: EventEmitterFactory, protected _DataOptions) {
        super(_$, _EventEmitterFactory);
    }

    public init(options: any, config?: any): any {
        this._options = options;
        this._config = config;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
        this._assignEvents();
        this.refresh();
    }
    protected _onPageShown(e){
        let instance = e.data.instance;
        if(instance._slickInstance){//if slick exists, destroy the instance
            instance._$element.slick("setPosition");
        }
    }
    /**
     * Asigna los manejadores de eventos
     * @private
     */
    protected _assignEvents() {
        this._eventEmitter.globalEmitter.on(PageController.ON_SHOWN,{instance:this},this._onPageShown);
        this._$element.off("." + HzCarouselResource.NAMESPACE)
            .on(
                `${HzCarouselResource.ON_SLICK_BEFORE_CHANGE}.${HzCarouselResource.NAMESPACE}`,
                {instance: this},
                this._onSlickBeforeChange
            )
            .on(
                `${HzCarouselResource.ON_SLICK_AFTER_CHANGE}.${HzCarouselResource.NAMESPACE}`,
                {instance: this},
                this._onSlickAfterChange
            )
            .on(
                `${HzCarouselResource.ON_SLICK_INIT}.${HzCarouselResource.NAMESPACE} ${HzCarouselResource.ON_SLICK_REINIT}.${HzCarouselResource.NAMESPACE}`,
                {instance: this},
                this._onSlickInit
            );
    }
    protected _onSlickBeforeChange(e,slick,currentIndex,newIndex){
        let instance = e.data.instance;
        //update the state of the dot if exists
        if(slick.$dots){
            let $dot = slick.$dots.children().eq(newIndex);
            $dot.addClass(HzCarouselResource.CLASS_ACTIVED);
        }
    }
    /**
     * Invocado al inicializarse o actualizarse slick. Guarda la instancia de slick
     * @param e
     * @param slick
     * @private
     */
    protected _onSlickInit(e, slick) {
        let instance = e.data.instance;
        instance._slickInstance = slick;
        slick.goTo(slick.options.initialSlide);
    }

    /**
     * Crea los estados de las slides para el control de visualización
     * @private
     */
    protected _createState() {
        this._visitedCount = 0;
        this._slideState = [];
        let count = this._slickInstance.slideCount;
        for (let slideIndex = 0; slideIndex < count; slideIndex++) {
            this._slideState.push(
                {
                    visited: false
                }
            );
        }
        //update the state of the initial slide
        this._updateSlideState(this._slickInstance.initialSlide);
    }

    /**
     * Invocado tras finalizar la activación de una slide. Actualiza el estado de la slide
     * @param e
     * @param slickInstance
     * @param slideIndex
     * @private
     */
    protected _onSlickAfterChange(e, slickInstance, slideIndex) {
        let instance = e.data.instance;
        instance._updateSlideState(slideIndex);
    }

    /**
     * Actualiza el estado de la slide. Si todas las slides se han visualizado se establece el recurso como finalizado
     * @param slideIndex
     * @private
     */
    protected _updateSlideState(slideIndex){
        let slideState = this._slideState[slideIndex];
        if(slideState){
            if(slideState.visited !== true){
                slideState.visited = true;
                this._visitedCount++;
                if(this._visitedCount === this._slickInstance.slideCount){
                    this._markAsCompleted();
                }
            }
        }
    }

    /**
     * Re inicializa slick
     */
    public refresh() {
        if(this._slickInstance){//if slick exists, destroy the instance
            this._$element.slick("unslick");
        }
        let slickOptions = this._DataOptions.getDataOptions(this._$element, HzCarouselResource.SLICK_PREFIX);
        slickOptions = $.extend(true,{},HzCarouselResource._SLICK_DEFAULTS,slickOptions);
        //see the page of slick to know all posible options
        this._slickOptions = slickOptions;
        this._$element.slick(slickOptions);
        this._createState();
    }

    public getInstance(): any {
        return this._slickInstance;
    }
}
