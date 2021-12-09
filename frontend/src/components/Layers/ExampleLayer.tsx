import React from 'react';
import { IModalData } from '~/plugins/Layer/Layer';

const ExampleLayer: React.FC<IModalData> = props => {
    console.log('ExampleLayer render', props);

    return (
        <div className="relative flex w-full pointer-events-auto max-w-xs py-10 cursor-auto">
            <div className="relative flex flex-col flex-1 bg-gray-200 text-black text-md text-center uppercase rounded-2xl p-10">
                Example layer
            </div>
        </div>
    );
};

export default React.memo(ExampleLayer);
