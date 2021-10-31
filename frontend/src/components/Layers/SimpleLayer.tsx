import React from 'react';
import InputAtomic from '~/components/Form/Input/InputAtomic';
import { IModalData } from '~/plugins/Layer/Layer';

const ExampleLayer: React.FC<IModalData> = props => {
    console.log(props);

    return (
        <div className="relative flex w-full pointer-events-auto max-w-xs py-10 cursor-auto">
            <div className="relative flex flex-col flex-1 bg-gray-200 rounded-2xl p-10">
                <InputAtomic />
            </div>
        </div>
    );
};

export default ExampleLayer;
