import React, { useState } from 'react';
import Input from '~/components/Form/Input/Input';
import Toggle from '~/components/Form/Toggle/Toggle';
import Button from '~/components/Button/Button';
import Select from '~/components/Form/Select/Select';
import WebpackIcon from '~/assets/svg/webpack.svg';
import useLayer from '~/plugins/Layer/useLayer';

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

const HomePage: React.FC = () => {
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
    const { openLayer } = useLayer();

    return (
        <div>
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
                        <Button onClick={() => openLayer('ExampleLayer')}>Кнопка</Button>
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
        </div>
    );
};

export default HomePage;
