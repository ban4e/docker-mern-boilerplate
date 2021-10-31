import { useCallback, Ref } from 'react';

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
export default <T>(...refs: Array<Ref<T>>): Ref<T> => useCallback(
    (element: T) => refs.forEach((ref): void => {
        if (!ref) {return}

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
            // return ref(element);
            ref(element);
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref as any).current = element;
    }),
    refs
);
