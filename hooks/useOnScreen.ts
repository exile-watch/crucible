import { useEffect, useState } from 'react';

export default function useOnScreen<T>(selector: T) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer: any = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    if (selector) observer.observe(selector);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [observer, selector]);

  return isIntersecting;
}
