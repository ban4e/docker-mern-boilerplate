import { useContext } from 'react';
import LayerContext from './LayerContext';
import LayerManager from './LayerManager';

interface ILayerPublicMethods {
    openLayer: LayerManager['open'];
    closeLayer: LayerManager['close'];
}


export default function useLayer(): ILayerPublicMethods {
    const layerContext = useContext(LayerContext);
    console.log(layerContext);

    return {
        openLayer: (...args) => { console.log(...args); layerContext.$layer?.open(...args) },
        closeLayer: (...args) => layerContext.$layer?.close(...args)
    };
}
