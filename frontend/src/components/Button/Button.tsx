import React, {  useState, useRef, PropsWithChildren, ButtonHTMLAttributes, MouseEvent } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useRect from '~/helpers/useRect';
import useDidMountEffect from '~/helpers/useDidMountEffect';
import CheckIcon from '~/assets/svg/check.svg';

/* Размеры */
export enum Sizes {
    'md' = 'md'
}
/* Темы */
export enum Themes {
    'primary' = 'primary'
}
/* Представления */
export enum Views {
    'box' = 'box'
}

interface IButtonVariantProps {
    theme?: keyof typeof Themes;
    size?: keyof typeof Sizes;
    view?: keyof typeof Views;
    disabled?: boolean;
    loading?: boolean;
    className?: string | Array<string | Record<string, boolean>> | Record<string, boolean>;
    isPulse?: boolean;
}
interface IBaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: MouseEvent)=> void;
}
interface IButtonTagProps {
    tag: 'span' | 'div';
}

type PulseItemType = {
    id: number;
    x: number;
    y: number;
    style: {
        width: number;
        top: number;
        left: number;
    }
}

type IButtonProps =
    (IButtonVariantProps & IBaseButtonProps & Partial<IButtonTagProps>)
    | (IButtonVariantProps & IButtonTagProps & Partial<IBaseButtonProps>);

const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
    theme = Themes.primary,
    size = Sizes.md,
    view,
    loading,
    children,
    disabled,
    className,
    tag,
    type,
    isPulse = true,
    onClick,
    ...props
}) => {
    const [completed, setCompleted] = useState<boolean>(false); // Выводит галочку после успешной загрузки

    /** Классы */
    const themeClass = theme && styles[`button_theme_${ theme }`];
    const sizeClass = size && styles[`button_size_${ size }`];
    const viewClass = view && styles[`button_view_${ view }`];
    const rootClass = classNames(styles.button, themeClass, sizeClass, viewClass, className, {
        'is-loading': loading,
        'is-disabled': disabled,
        'is-completed': completed
    });

    /***** LOADING *****/
    useDidMountEffect(() => {
        if (!loading) { setCompleted(true) }
    }, [loading]);
    /***** LOADING END *****/

    /***** PULSE *****/
    const buttonRef = useRef<HTMLButtonElement>(null);
    const buttonRect = useRect(buttonRef);
    const [pulseArr, setPulseArr] = useState<Array<PulseItemType>>([]);

    const handleClick = (e: MouseEvent<HTMLElement>): void => {
        onClick && onClick(e);

        if (!isPulse) { return }
        setPulseArr([
            ...pulseArr,
            {
                id: new Date().getTime(),
                x: e.clientX, y: e.clientY,
                style: { width: 0, top: 0, left: 0 }
            }
        ]);
    };
    const handlePulseEnter = (index: number): void => {
        const pusleItem = [...pulseArr][index];
        const sideWidth = Math.min(buttonRect.width, buttonRect.height);
        const updatedPulseArr = [...pulseArr];
        updatedPulseArr.splice(index, 1, {
            ...pusleItem,
            style: {
                width: sideWidth,
                top: pulseArr[index].y - buttonRect.top - sideWidth / 2,
                left: pulseArr[index].x - buttonRect.left - sideWidth / 2
            }
        });
        setPulseArr(updatedPulseArr);
    };
    const handlePulseEntered = (index: number): void => {
        const updatedPulseArr = [...pulseArr];
        updatedPulseArr.splice(index, 1);
        setPulseArr(updatedPulseArr);
    };
    /***** PULSE END *****/

    const buttonTag = tag && 'custom' || 'button';
    const content = (
        <>
            { loading && <span className={styles.button__loader}></span> }
            <CSSTransition
                in={completed}
                timeout={850}
                className={styles.button__completed}
                unmountOnExit
                exit={false}
                onEntered={() => { setCompleted(false) }}
                appear
            >
                <CheckIcon width="24" height="24" className={styles.button__completed} />
            </CSSTransition>
            <span className={styles.button__content}>
                { children }
            </span>
            {
                isPulse &&
                <TransitionGroup>
                    {
                        pulseArr.map((pulseItem, i) => {
                            return (
                                <CSSTransition
                                    key={pulseItem.id}
                                    timeout={600}
                                    className={styles['button-pulse']}
                                    unmountOnExit
                                    exit={false}
                                    onEnter={() => { handlePulseEnter(i) }}
                                    onEntered={() => { handlePulseEntered(i) }}
                                    appear
                                >
                                    <span>
                                        <span className={styles['button-pulse__effect']} style={pulseItem.style}></span>
                                    </span>
                                </CSSTransition>
                            );
                        })
                    }
                </TransitionGroup>
            }
        </>
    );

    // TODO: Добавить ссылку
    switch (buttonTag) {
        case 'custom': {
            const Tag = tag as 'div' | 'span';

            return (
                <Tag className={rootClass} onClick={handleClick}>
                    {content}
                </Tag>
            );
        }
        default: {
            return (
                <button
                    ref={buttonRef}
                    className={rootClass}
                    type={type || 'button'}
                    onClick={handleClick}
                    {...props}
                >
                    {content}
                </button>
            );
        }
    }
};

export default Button;