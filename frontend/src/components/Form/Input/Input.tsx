import React, { forwardRef, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import InputAtomic, { InputMasks } from './InputAtomic';
import useRect from '~/helpers/useRect';
import styles from './inputField.module.css';

enum View {
    'filled' = 'filled',
    'outlined' = 'outlined',
    'light' = 'light'
}

export interface IRenderInput {
    onFocus: () => void;
    onBlur: () => void;
}

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'className'> {
    /** Отображение */
    view?: keyof typeof View;
    /** Установка html-node в правом углу инпута */
    suffix?: React.ReactNode;
    /** Маска ввода */
    mask?: keyof typeof InputMasks;
    /** Выключенное состояние */
    disabled?: boolean;
    /** Текст ошибки */
    error?: string;
    /** Дополнительные классы */
    className?: string | Array<string | Record<string, boolean>> | Record<string, boolean>;
    /** Альтернатива placeholder */
    label?: string;
    /** Рендер-проп */
    renderInput?: (props: IRenderInput) => JSX.Element;
}

const labelScale = 0.75;

const Input = forwardRef<HTMLInputElement, IInputProps>(({
    error,
    className,
    suffix,
    disabled = false,
    label,
    renderInput,
    view = View.filled,
    ...props
}, ref) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(false);
    const [labelStyle, setLabelStyle] = useState({});
    const [legendStyle, setLegendStyle] = useState({});
    const [labelTranslateY, setLabelTranslateY] = useState<number | null>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const legendRef = useRef<HTMLLegendElement>(null);
    const [localValue, setLocalValue] = useState(props.value);
    const labelRect = useRect(labelRef);

    /**
     * Рассчитать смещение лейбла при фокусе / заполненном значении
     * @returns {number} translateY
     */
    const calculateLabelTranslate = (): number | null => {
        const labelElem = labelRef.current;
        if (!labelElem) { return null }
        const labelTop = labelElem.offsetTop;
        const translateY = view !== View.outlined
            ? (labelTop / 2 + labelRect.height * labelScale * 0.5) * -1
            : (labelTop + labelRect.height * labelScale * 0.5) * -1;

        return translateY;
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange ? props.onChange(e) : setLocalValue(e.target.value);
    };

    useEffect(() => {
        setLabelTranslateY(calculateLabelTranslate());
    }, [labelRect]);

    useEffect(() => {
        localValue ? setFilled(true) : setFilled(false);
    }, [localValue]);

    useEffect(() => {
        let resultLabelStyle = {};
        let resultLegendStyle = {};

        if ((focused || filled) && labelRef.current) {
            resultLabelStyle = { transform: `translateY(${ labelTranslateY }px) scale(${ labelScale })` };
            resultLegendStyle = legendRef.current && { width: `${ labelRef.current.offsetWidth * labelScale }px` } || {};
        }

        setLabelStyle(resultLabelStyle);
        setLegendStyle(resultLegendStyle);
    }, [filled, focused]);

    return (
        <div className={classNames(styles.field, className, {
            [styles['is-focused']]: focused,
            [styles['is-filled']]: filled,
            [styles.field_light]: view === View.light,
            [styles.field_outlined]: view === View.outlined,
            'is-disabled': disabled
        })}
        >
            <div className={styles.field__container}>
                {
                    view === View.outlined &&
                        <fieldset className={styles.field__fieldset}>
                            { label && <legend className={styles.field__legend} ref={legendRef} style={legendStyle} /> }
                        </fieldset>
                }
                <div className={styles.field__entry}>
                    {
                        renderInput
                            ? renderInput({
                                onFocus: () => setFocused(true),
                                onBlur: () => setFocused(false)
                            })
                            :
                            <InputAtomic
                                className={styles.field__input}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                onChange={onChangeHandler}
                                ref={ref}
                                {...props}
                            />
                    }
                    {
                        !props.placeholder && label &&
                        <span ref={labelRef} className={styles.field__label} style={labelStyle}>{ label }</span>
                    }
                    {
                        suffix && <div className="field__suffix">{ suffix }</div>
                    }
                </div>
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
