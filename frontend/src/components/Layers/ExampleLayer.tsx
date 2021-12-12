import React from 'react';
import { IModalBaseProps } from '~/plugins/Layer/Layer';
import Button from '~/components/Button/Button';

const ExampleLayer: React.FC<IModalBaseProps> = props => {
    console.log('ExampleLayer render', props);

    return (
        <div className="relative flex w-full pointer-events-auto max-w-xs py-10 cursor-auto">
            <div className="relative flex flex-col flex-1 bg-gray-200 text-black text-md text-center uppercase rounded-2xl p-10">
                Example layer
                <Button onClick={() => { props.close().then(() => console.log('hey from closed ExampleLayer')) }}>
                    Привет
                </Button>
            </div>
        </div>
    );
};

export default React.memo(ExampleLayer);
