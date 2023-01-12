import { useEffect, useRef } from 'react';

/**
 * Returns reference to previous state.
 * @param {any} value - any stateful react value
 * @returns {any} - reference to previous state value
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
