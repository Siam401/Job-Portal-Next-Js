import { useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
): React.RefObject<T> {
  const ref = useRef<T>(null);

  const handleClick = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    const eventName = isTouchDevice ? 'touchstart' : 'mousedown';

    document.addEventListener(eventName, handleClick);

    return () => {
      document.removeEventListener(eventName, handleClick);
    };
  }, []);

  return ref;
}

export default useClickOutside;
