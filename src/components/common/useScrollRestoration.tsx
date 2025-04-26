// hooks/useScrollRestoration.js
import { useEffect, useRef } from 'react';

const useScrollRestoration = () => {
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    // Save scroll position before the page unloads
    const saveScrollPosition = () => {
      scrollPositionRef.current = window.scrollY;
    };

    // Restore scroll position after the component mounts
    const restoreScrollPosition = () => {
      window.scrollTo(0, scrollPositionRef.current);
    };

    // Add event listener for saving scroll position
    window.addEventListener('beforeunload', saveScrollPosition);

    // Restore scroll position on mount
    restoreScrollPosition();

    // Clean up the event listener
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);
};

export default useScrollRestoration;
