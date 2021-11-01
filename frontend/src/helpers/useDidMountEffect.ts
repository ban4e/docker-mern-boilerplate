import React, { DependencyList, useEffect, useRef } from 'react';

const useDidMountEffect = (cb: (()=> void), deps: DependencyList): void => {
    const didMount = useRef(false);

    useEffect(() => {
        didMount.current ? cb() : didMount.current = true;
    }, deps);
};

export default useDidMountEffect;