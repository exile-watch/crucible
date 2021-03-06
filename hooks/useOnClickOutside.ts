import {RefObject, useEffect} from "react";
import {DOMEvent} from "#types";

function useOnClickOutside(ref: RefObject<HTMLElement>, handler: EventHandlerNonNull) {
  useEffect(
    () => {
      const listener = (event: DOMEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [ref, handler]
  );
}

export default useOnClickOutside