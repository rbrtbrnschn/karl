import { useEffect } from 'react';

/**
 * Semantically clean way of running a useEffect with empty arguments.
 * @param {()=>void} fn - callback to run on 'mount'
 */
export const useMountEffect = (fn: () => void) => {
  useEffect(fn, []);
};
