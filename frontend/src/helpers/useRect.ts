// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import React, { useLayoutEffect, useCallback, useState } from 'react';

type RectResult = {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
};

function getRect<T extends HTMLElement>(element?: T): RectResult {
    let rect: RectResult = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0
    };
    if (element) { rect = element.getBoundingClientRect() }
    return rect;
}

export default function useRect<T extends HTMLElement>(
    ref: React.RefObject<T>
): RectResult {
    const [rect, setRect] = useState<RectResult>(
        ref && ref.current ? getRect(ref.current) : getRect()
    );

    const handleResize = useCallback(() => {
        if (!ref.current) {return}
        setRect(getRect(ref.current)); // Update client rect
    }, [ref]);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {return}

        handleResize();

        if (typeof ResizeObserver === 'function') {
            let resizeObserver: ResizeObserver | null = new ResizeObserver(() => handleResize());
            resizeObserver.observe(element);
            return () => {
                if (!resizeObserver) { return }
                resizeObserver.disconnect();
                resizeObserver = null;
            };
        } 
        window.addEventListener('resize', handleResize); // Browser support, remove freely
        return () => window.removeEventListener('resize', handleResize);
    
    }, [ref.current]);

    return rect;
}
