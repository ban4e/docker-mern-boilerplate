import React from 'react';
import classNames from 'classnames';
import CheckIcon from '~/assets/svg/check.svg';
import styles from './Toggle.module.css';

enum ToggleTypes {
    'checkbox' = 'checkbox',
    'radio' = 'radio'
}

export interface ToggleProps extends React.PropsWithChildren<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>> {
    type?: keyof typeof ToggleTypes;
    className?: string | Array<string | Record<string, boolean>> | Record<string, boolean>;
}


const Toggle: React.FC<ToggleProps> = ({
    type = ToggleTypes.checkbox, 
    className, 
    children, 
    ...props
}) => (
    <label 
        className={classNames(styles.toggle, className, {
            [styles.toggle_radio]: type === ToggleTypes.radio
        })}
    >
        <input
            type={type}
            className={styles.toggle__input}
            {...props}
        />
        <span className={styles.toggle__content}>
            <span className={styles.toggle__mark}>
                <span className={styles['toggle__mark-focus']} />
                { 
                    type === ToggleTypes.checkbox && (
                        <>
                            <CheckIcon className={styles['toggle__mark-icon']} />
                            <svg className={styles['toggle__mark-figure']} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.00019 10C0.995667 7 1.00018 1.00001 10.0002 1C19.0002 0.999995 19.0002 7 19.0002 10C19.0002 13 19.0002 19 10.0002 19C1.00019 19 0.995667 13 1.00019 10Z" />
                            </svg>
                        </>
                    )
                }
                {
                    type === ToggleTypes.radio && (
                        <div className={styles['toggle__mark-figure']} />
                    )
                }
            </span>
        </span>
        {
            children && (
                <span className={styles.toggle__title}>
                    { children }
                </span>
            )
        }
    </label>
);

export default Toggle;
