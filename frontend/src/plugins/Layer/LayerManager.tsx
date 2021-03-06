import Layer, { ILayerData, IModalIncomingProps } from './Layer';

interface ILayerManagerProps {
    layers: ILayerData[];
    context: Layer;
}


export default class LayerManager {
    readonly layers: ILayerData[];
    readonly context: Layer;

    constructor(props: ILayerManagerProps) {
        Object.assign(this, props);
    }

    /**
     * Открывает модальное окно по указанному имени
     * @param name Имя модального окна
     * @param props Входящие пропсы
     */
    public open(name: string, props?: IModalIncomingProps): void {
        // Ищем текущее открытое модальное окно, исходя из предположения, что может быть только одно активное окно
        const lastOpenedLayerIndex = this.layers.findIndex(layer => layer.isOpen);
        this.layers.forEach((layer, index) => {
            layer.isFront = false;
            if (lastOpenedLayerIndex > -1 && index === lastOpenedLayerIndex) {
                layer.invisibleTime = new Date().getTime();
            }
        });

        const openLayerData = { isFront: true, isOpen: true, isClosing: false };

        const layerIndex = this.findLayerIndexByName(name);
        layerIndex > -1
            ? this.layers.splice(layerIndex, 1, {
                ...this.layers[layerIndex],
                ...props,
                ...openLayerData
            })
            : this.layers.push({
                ...props,
                ...openLayerData,
                key: name,
                name
            });

        this.context.setState({ layers: this.layers });
        this.lockBody();
    }

    /**
     * Закрывает модальное окно. Если не указать имя – будет закрыто модальное окно переднего плана
     * @param name Имя модального окна
     */
    public close(name?: string): Promise<unknown> | undefined {
        if (name) {
            const layerIndex = this.findLayerIndexByName(name);
            if (layerIndex > -1) {
                let closeResolver = null;

                const closePromise = new Promise(resolve => {
                    closeResolver = resolve;
                });

                // Если модальное окно не открыто или закрывается - выводим ошибку
                if (!this.layers[layerIndex].isOpen) {
                    throw new Error(`Модальное окно с именем ${name} закрыто`);
                }

                this.layers.splice(layerIndex, 1, {
                    ...this.layers[layerIndex],
                    isFront: false, // Истино для того, чтобы корректно работал CSSTransition
                    isOpen: false,
                    isClosing: true,
                    closeResolver: closeResolver,
                    invisibleTime: null
                });

                // Найдем предыдущее открытое окно, если таковое имеется
                const openedLayers = this.layers.filter(layer => layer.isOpen).sort((a, b) => {
                    const aInvisibleTime = a.invisibleTime || 1;
                    const bInvisibleTime = b.invisibleTime || 1;

                    return aInvisibleTime - bInvisibleTime;
                });
                const lastOpenedLayer = openedLayers && openedLayers[0];
                const lastOpenedLayerIndex = lastOpenedLayer && this.layers.findIndex(layer => layer.invisibleTime === lastOpenedLayer.invisibleTime);
                if (lastOpenedLayerIndex > -1) {
                    this.layers.splice(lastOpenedLayerIndex, 1, {
                        ...this.layers[lastOpenedLayerIndex],
                        isFront: true,
                        invisibleTime: null
                    });
                }

                this.context.setState({ layers: this.layers });
                // if (!this.checkOpenedLayers()) { this.unlockBody() }

                return closePromise;
            }

            throw new Error(`Модальное окно с именем ${name} закрыто или не существует`);
        } else {
            const openedLayers = this.layers.filter(layer => layer.isOpen && layer.isFront);
            const lastOpenedLayerName = openedLayers.length && openedLayers[openedLayers.length - 1].name;
            lastOpenedLayerName && this.close(lastOpenedLayerName);
        }
    }

    /** Вспомогательные методы  */

    /**
     * TODO: private method
     * Переводит модальное окно в закрытое состояние
     * @param name
     */
    public _setClosed(name: string): void {
        const layerIndex = this.findLayerIndexByName(name);
        const layerData = this.layers[layerIndex];
        if (layerIndex < 0) { return }

        if (!this.layers[layerIndex].isClosing) {
            throw new Error(`Модальное окно с именем ${name} закрыто`);
        }

        this.layers.splice(layerIndex, 1, {
            ...layerData,
            isClosing: false,
            closeResolver: null
        });
        this.context.setState({ layers: this.layers });

        layerData.onAfterClose && layerData.onAfterClose();
        if (!this.checkOpenedLayers()) { this.unlockBody() }
    }

    /**
     * Выполняет поиск модального окна по имени. Возвращает индекс.
     * @param name Имя модального окна
     * @returns Индекс модального окна или "-1", если модальное окно не найдено
     */
    private findLayerIndexByName(name: string): number {
        return this.layers.findIndex(layer => {
            return layer.name === name;
        });
    }

    /**
     * Проверяет наличие открытых модальных окон
     * @return Boolean
     */
    public checkOpenedLayers(): boolean {
        let result = false;
        if (this.layers.some(layer => layer.isOpen || layer.isClosing)) { result = true }

        return result;
    }

    /**
     * Проверяет может ли текущее модальное окно быть закрыто кликом по бэкдропу или через Esc
     * @return Boolean
     */
    public checkVisibleLayerIsClosable(): boolean {
        let result = true;
        if (this.layers.find(layer => layer.isFront && layer.isOpen && layer.disallowClose )) { result = false }

        return result;
    }


    /**
     * Количество открытых модальных окон
     * @return Number
     */
    get openedLayersLength(): number {
        return this.layers.filter(layer => layer.isOpen || layer.isClosing).length;
    }

    /**
     * Добавляет классы body при открытом модальном окне
     */
    private lockBody(): void {
        const body = document.querySelector('body');
        body && body.classList.add('is-locked');
    }

    /**
     * Удаляет классы body при отсутствии модальных окон
     */
    private unlockBody(): void {
        const body = document.querySelector('body');
        body && body.classList.remove('is-locked');
    }
}