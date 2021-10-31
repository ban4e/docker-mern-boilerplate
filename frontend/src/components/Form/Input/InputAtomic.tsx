import React, { forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import Inputmask from 'inputmask';
import useCombinedRefs from '~/helpers/useCombinedRefs';

export enum InputMasks {
    'phone' = 'phone',
    'numeric' = 'numeric',
    'money' = 'money'
}

export interface IInputAtomic extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    className?: string | Array<string | Record<string, boolean>> | Record<string, boolean>;
    mask?: keyof typeof InputMasks;
}

const InputAtomic = forwardRef<HTMLInputElement, IInputAtomic>(({
    type = 'text',
    className,
    mask,
    ...props
}, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    useEffect(() => {
        if (!mask) {return}

        let options: Inputmask.Options = {
            clearMaskOnLostFocus: true,
            clearIncomplete: false,
            showMaskOnHover: false,
            showMaskOnFocus: false,
            autoUnmask: true
        };

        switch (mask) {
            case 'phone': {
                options = {
                    ...options,
                    jitMasking: false,
                    mask: '+7 (999) 999-99-99',
                    placeholder: '+7 (___) ___-__-__',
                    clearIncomplete: false,
                    onUnMask: (maskedValue: string) => {
                        const unmasked = Inputmask.unmask(maskedValue, { mask: '+7 (999) 999-99-99' });
                        const result = unmasked && `+7${ unmasked }`;

                        return `${ result.replace(/[\s-()]+/g, '') }`;
                    }
                };

                break;
            }
            case 'numeric': {
                options = {
                    ...options,
                    digitsOptional: true,
                    digits: 0,
                    groupSeparator: ' ',
                    placeholder: '0',
                    numericInput: true,
                    alias: 'numeric',
                    radixPoint: '.',
                    rightAlign: false
                };

                break;
            }
            case 'money': {
                options = {
                    ...options,
                    digitsOptional: true,
                    digits: 0,
                    groupSeparator: ' ',
                    placeholder: '0',
                    numericInput: true,
                    suffix: ' ₽',
                    alias: 'numeric',
                    radixPoint: '.',
                    rightAlign: false
                };

                break;
            }
            default: {
                options = {
                    ...options,
                    mask
                };
            }
        }

        if (innerRef.current) {new Inputmask(options).mask(innerRef.current as HTMLInputElement)}
    }, [innerRef]);

    return (
        <input
            ref={combinedRef}
            className={classNames(className)}
            type={type}
            {...props}
        />
    );
});

InputAtomic.displayName = 'InputAtomic';

export default InputAtomic;
