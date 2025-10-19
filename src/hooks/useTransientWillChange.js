import { useEffect, useRef } from 'react';

const DEFAULT_TIMEOUT = 2000;

const assignRef = (ref, value) => {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

export default function useTransientWillChange(externalRef, property, opts = {}) {
  const { active = true, timeout = DEFAULT_TIMEOUT } = opts;
  const localRef = useRef(null);

  useEffect(() => {
    assignRef(externalRef, localRef.current);
  }, [externalRef]);

  useEffect(() => {
    if (!active) return undefined;

    const node = localRef.current;
    if (!node) return undefined;

    node.style.willChange = property;

    const reset = () => {
      if (node && node.style) {
        node.style.willChange = 'auto';
      }
    };

    const timeoutId = window.setTimeout(reset, timeout);

    return () => {
      window.clearTimeout(timeoutId);
      reset();
    };
  }, [active, property, timeout]);

  return localRef;
}
