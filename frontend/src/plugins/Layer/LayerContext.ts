import { createContext } from 'react';
import LayerManager from './LayerManager';

export interface ILayerContext {
    $layer?: LayerManager;
}

export default createContext<ILayerContext>({});
