import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

type Selected = {
    id: number;
    title: string;
}

interface ISelectProps<T> {
    value?: T;
    onChange?: (value: T) => void;
    disabled?: boolean;
    options: Array<T>;
}

const Select: React.FC<ISelectProps<any>> = ({
    value,
    onChange,
    options,
    disabled = false
}) => {
    const [localValue, setLocalValue] = useState(value);
    const onValueChange = (payload): void => {
        console.log(payload);
        onChange ? onChange(payload) : setLocalValue(payload);
    };

    return (
        <Listbox value={localValue} onChange={onValueChange} disabled={disabled}>
            {
                ({ open }) => (
                    <>
                        <Listbox.Button className="relative text-black text-left w-full py-2 pl-3 pr-10 bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{ localValue && localValue.label }</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">

                            </span>
                        </Listbox.Button>
                        <Listbox.Options>
                            {
                                options.map(option => (
                                    <Listbox.Option
                                        key={option.id}
                                        value={option}
                                        disabled={option.disabled}
                                    >
                                        <span className={option.disabled ? 'opacity-75' : ''}>
                                            {option.label}
                                        </span>
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </>
                )
            }
        </Listbox>
    );
};

export default Select;