import ReactDOM from 'react-dom';
import React from 'react';
import LayerManager from './plugins/Layer/LayerManager';
import LayoutWithLayer from '~/layout/LayoutWithLayer';
import HomePage from '~/pages/Home';

import '~/assets/css/main.css';


const obj = {
    foo: {
        bar: 2
    }
};

declare global {
    interface Window {
        $layer: LayerManager;
    }
}

function App(): JSX.Element {
    return (
        <LayoutWithLayer>
            <HomePage />
        </LayoutWithLayer>
    );
}

console.log('optional-chaining example', obj?.foo?.bar);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
