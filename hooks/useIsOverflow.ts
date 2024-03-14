import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsOverflow = (
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void,
) => {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [isOverflow, setIsOverflow] = useState<boolean | undefined>(undefined);

  const canUseDOM = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const trigger = () => {
      if (!ref.current) return;
      const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    };

    if (ref.current && "ResizeObserver" in window) {
      resizeObserver.current = new ResizeObserver(trigger);
      resizeObserver.current?.observe(ref.current);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current?.disconnect();
        resizeObserver.current = null;
      }
    };
  }, [callback, ref]);

  return isOverflow;
};

export { useIsOverflow };
