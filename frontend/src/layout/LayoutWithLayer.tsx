import React from 'react';
import Layer from '~/plugins/Layer/Layer';

const LayoutWithLayer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const ctx = require.context('~/components/Layers/', true, /\.\/[A-Z]\w+\.(tsx)$/); // layer

    return (
        <Layer
            context={ctx}
            inject={manager => {
                window.$layer = manager;
            }}
            transitionName="alert"
            transitionDuration={300}
        >
            { children }
        </Layer>
    );
};

export default LayoutWithLayer;