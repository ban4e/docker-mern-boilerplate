import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Input from '~/components/Form/Input/Input';
import Toggle from '~/components/Form/Toggle/Toggle';
import Button from '~/components/Button/Button';
import Select from '~/components/Form/Select/Select';
import Layer from './plugins/Layer/Layer';
import LayerManager from './plugins/Layer/LayerManager';
import WebpackIcon from '~/assets/svg/webpack.svg';

import '~/assets/css/main.css';

const obj = {
    foo: {
        bar: 2
    }
};

const extensions = [
    {
        id: '1',
        label: 'PNG',
        value: 'png'
    },
    {
        id: '2',
        label: 'JPEG',
        value: 'jpeg'
    },
    {
        id: '3',
        label: 'WEBP',
        value: 'webp'
    }
];

declare global {
    interface Window {
        $layer: LayerManager;
    }
}

function App(): JSX.Element {
    const ctx = require.context('~/components/Layers/', true, /\.\/[A-Z]\w+\.(tsx)$/); // layer
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    return (
        <Layer
            context={ctx}
            inject={manager => {
                window.$layer = manager;
            }}
            transitionName="alert"
            transitionDuration={300}
        >
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <code className="block mb-4">Input default</code>
                        <Input label="Введите имя" />
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Input view="outlined"</code>
                        <Input label="Введите имя" view="outlined" />
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Input view="light"</code>
                        <Input label="Введите имя" view="light" />
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Button default</code>
                        <Button>Кнопка</Button>
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Button box</code>
                        <Button view="box">
                            <WebpackIcon width="40" />
                        </Button>
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Loading button (by click)</code>
                        <Button
                            loading={isButtonLoading}
                            onClick={() => setIsButtonLoading(prevState => !prevState)}
                        >
                            Кнопка
                        </Button>
                        <Button view="box" loading={isButtonLoading} className="ml-4">
                            <WebpackIcon width="40" />
                        </Button>
                    </div>
                    <div className="col-span-4">
                        <div className="block mb-4">
                            <Select options={extensions} value={extensions[0]} className="max-w-xs" />
                        </div>
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Checkbox</code>
                        <Toggle>Переключатель</Toggle>
                    </div>
                    <div className="col-span-4">
                        <code className="block mb-4">Radio</code>
                        <Toggle type="radio">Переключатель</Toggle>
                    </div>
                </div>
            </div>
        </Layer>
    );
}

console.log('optional-chaining example', obj?.foo?.bar);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
