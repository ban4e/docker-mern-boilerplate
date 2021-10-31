import React from 'react';
import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import LayerContext from './LayerContext';
import LayerManager from './LayerManager';

const focusableSelectors: string[] = [
    'a[href]:not([tabindex^="-"])',
    'area[href]:not([tabindex^="-"])',
    'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
    'input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked',
    'select:not([disabled]):not([tabindex^="-"])',
    'textarea:not([disabled]):not([tabindex^="-"])',
    'button:not([disabled]):not([tabindex^="-"])',
    'iframe:not([tabindex^="-"])',
    'audio[controls]:not([tabindex^="-"])',
    'video[controls]:not([tabindex^="-"])',
    '[contenteditable]:not([tabindex^="-"])',
    '[tabindex]:not([tabindex^="-"])'
];
function isVisible(element: HTMLElement): boolean {
    return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
function getFocusableChildren(element: HTMLElement) {
    const elements = Array.prototype.slice.call(element.querySelectorAll(focusableSelectors.join(',')));

    return elements.filter(isVisible);
}

/**
 * Пропы для открытия модального окна
 */
export interface IModalProps {
    /** Класс для CSS-transition. Используется библиотека react-transition-group*/
    transitionName?: string; //TODO: не реализовано
    /** Продолжительность для CSS-transition. Используется библиотека react-transition-group*/
    transitionDuration?: number; //TODO: не реализовано
    /** Возможность закрыть окно кликом вне или esc */
    isClosable?: boolean; //TODO: не реализовано
    /** Callback после закрытия окна */
    onAfterClose?: () => void;
}

/**
 * Пропы, доступные в компоненте модального окна
 */
export interface IModalData {
    /** Ключ */
    key: string;
    /** Название модального окна */
    name: string;
    /** Модальное окно открыто */
    isOpen: boolean;
    /** Показывать на переднем плане */
    isFront: boolean;
    /** Модальное окно закрывается. Используется для анимации закрытия. */
    isClosing: boolean;
    /** Контроллер модальных окон */
    $layer: LayerManager;
}

export interface ILayerData extends Omit<IModalData, '$layer'>, IModalProps {
    /** Функция resolve из Promise для подтверждения закрытия окна */
    closeResolver?: (() => void) | null;
}
interface ILayerProps {
    context: __WebpackModuleApi.RequireContext;
    inject?: (manager: LayerManager) => void;
    name?: string;
    /** Класс для CSS-transition. Используется библиотека react-transition-group*/
    transitionName?: string;
    /** Продолжительность для CSS-transition. Используется библиотека react-transition-group*/
    transitionDuration?: number;
}
interface ILayerState {
    layers: ILayerData[];
}
interface ILayersByName {
    [key: string]: string
}

export default class Layer extends Component<ILayerProps, ILayerState> {
    private manager: LayerManager;
    private layersByName: ILayersByName;
    private layersContainerElem = React.createRef<HTMLDivElement>();
    public transition: { name: string | null, duration: number };

    constructor(props: ILayerProps) {
        super(props);
        this.state = { layers: [] };
        this.manager = new LayerManager({
            layers: this.state.layers,
            context: this
        });
        this.transition = { name: props.transitionName || null, duration: props.transitionDuration || 0 };
        this.layersByName = this.getLayersName(this.props.context);
        props.inject && props.inject(this.manager);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentDidMount(): void {
        console.log('mounts');
        document.addEventListener('keydown', this._handleKeyDown);
    }
    componentDidUpdate(): void {
        if (this.manager.checkOpenedLayers() && this.layersContainerElem.current) { this.layersContainerElem.current.focus() }
    }
    componentWillUnmount(): void {
        document.removeEventListener('keydown', this._handleKeyDown);
    }

    /**
     * 
     * @param e 
     */
    _handleKeyDown = (e: KeyboardEvent): void => {
        console.log(e);
        if (e.key === 'Escape' && this.manager.checkOpenedLayers()) {
            this.manager.close();
        } else if (e.key === 'Tab' && this.layersContainerElem.current) {
            this._trapTabKey(this.layersContainerElem.current, e);
        }
    }

    /**
     * 
     * @param node 
     * @param event 
     */
    _trapTabKey(node: HTMLElement, event: KeyboardEvent): void {
        const focusableChildren = getFocusableChildren(node);
        const focusedItemIndex = focusableChildren.indexOf(document.activeElement);
        const lastIndex = focusableChildren.length - 1;
        const withShift = event.shiftKey;

        if (withShift && focusedItemIndex === 0) {
            focusableChildren[lastIndex].focus();
            event.preventDefault();
        } else if (!withShift && focusedItemIndex === lastIndex) {
            focusableChildren[0].focus();
            event.preventDefault();
        }
    }

    /**
     * 
     * @param ctx Результат require.context()
     * @returns Object { example: ./example.ext, ... }
     */
    getLayersName(ctx: __WebpackModuleApi.RequireContext): ILayersByName {
        return ctx.keys().reduce((acc: ILayersByName, name: string) => {
            if (!name) { return acc }

            const layerNameSplit = name.split('/')?.pop()?.split('.');
            const layerName = layerNameSplit && layerNameSplit[0];
            if (!layerName) { return acc }
            acc[layerName] = name;

            return acc;
        }, {});
    }

    render(): React.ReactNode {
        const { children, context } = this.props;
        if (!context) { return null }

        const cb = context;
        const layersNames = Object.keys(this.layersByName);

        return (
            <LayerContext.Provider value={{ $layer: this.manager }}>
                {children}
                {
                    this.manager.checkOpenedLayers() &&
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-70"></div>
                        <div
                            ref={this.layersContainerElem}
                            className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto min-h-screen z-1000"
                            role="dialog"
                            onClick={e => {
                                if (e.currentTarget === e.target) { this.manager.close() }
                            }}
                            tabIndex={0}
                        >
                            {
                                this.state.layers.map(layerData => {
                                    if (layersNames.includes(layerData.key) && (layerData.isOpen || layerData.isClosing)) {
                                        const modalComponent = React.createElement<IModalData>(
                                            cb(this.layersByName[layerData.name]).default,
                                            {
                                                key: layerData.name,
                                                name: layerData.name,
                                                isOpen: layerData.isOpen,
                                                isFront: layerData.isFront,
                                                isClosing: layerData.isClosing,
                                                $layer: this.manager
                                            }
                                        );

                                        return this.transition.name
                                            ? <CSSTransition
                                                key={layerData.name}
                                                appear
                                                in={layerData.isOpen}
                                                timeout={this.transition.duration}
                                                classNames={this.transition.name}
                                                onExited={() => {
                                                    /** TODO: maybe resolve via Emitter https://github.com/CodeDraken/emtr/blob/master/emitter.js */
                                                    layerData.closeResolver && layerData.closeResolver();
                                                    this.manager._setClosed(layerData.name);
                                                }}
                                            >
                                                {modalComponent}
                                            </CSSTransition>
                                            : modalComponent;
                                    }
                                })
                            }
                        </div>
                    </>
                }
            </LayerContext.Provider>
        );
    }
}