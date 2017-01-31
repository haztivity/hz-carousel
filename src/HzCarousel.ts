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
    DataOptions
} from "@haztivity/core/index";
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
export class HzCarousel extends ResourceController {
    public static readonly NAMESPACE = "hzCarousel";
    public static readonly ON_SLICK_AFTER_CHANGE = `afterChange`;
    public static readonly ON_SLICK_INIT = "init";
    public static readonly ON_SLICK_REINIT = "reInit";
    protected static readonly SLICK_PREFIX = "slick";
    protected _slickOptions: any;
    protected _slickInstance: any;
    protected _slideState:ISlideState[];
    protected _visitedCount:number;
    protected static readonly _SLICK_DEFAULTS = {
        adaptiveHeight:true,
        dots:true,
        infinite:false
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
        this._assignEvents();
        this.refresh();
    }

    /**
     * Asigna los manejadores de eventos
     * @private
     */
    protected _assignEvents() {
        this._$element.off("." + HzCarousel.NAMESPACE)
            .on(
                `${HzCarousel.ON_SLICK_AFTER_CHANGE}.${HzCarousel.NAMESPACE}`,
                {instance: this},
                this._onSlickAfterChange
            )
            .on(
                `${HzCarousel.ON_SLICK_INIT}.${HzCarousel.NAMESPACE} ${HzCarousel.ON_SLICK_REINIT}.${HzCarousel.NAMESPACE}`,
                {instance: this},
                this._onSlickInit
            );
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

    }

    /**
     * Crea los estados de las slides para el control de visualización
     * @private
     */
    protected _createState() {
        this._visitedCount = 1;//the first slide is visited by default
        this._slideState = [];
        let count = this._slickInstance.slideCount;
        for (let slideIndex = 0; slideIndex < count; slideIndex++) {
            this._slideState.push(
                {
                    visited: false
                }
            );
        }
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
        let slickOptions = this._DataOptions.getDataOptions(this._$element, HzCarousel.SLICK_PREFIX);
        slickOptions = $.extend(true,{},HzCarousel._SLICK_DEFAULTS,slickOptions);
        //see the page of slick to know all posible options
        this._slickOptions = slickOptions;
        this._$element.slick(slickOptions);
        this._createState();
    }

    public getInstance(): any {
        return this._slickInstance;
    }
}