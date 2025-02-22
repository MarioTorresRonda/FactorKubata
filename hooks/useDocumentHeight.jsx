import { useState, useEffect } from 'react';

function useDocumentHeight() {
  const [scrollHeight, setScrollHeight] = useState(() => document.body.scrollHeight);

  useEffect(() => {
    const updateScrollHeight = () => {
      setScrollHeight(document.body.scrollHeight);
    };

    // Create a ResizeObserver to watch for changes in element size
    const observer = new ResizeObserver(updateScrollHeight);
    observer.observe(document.body);
    updateScrollHeight(); // Initial measurement

    // Clean up observer
    return () => {
      observer.disconnect();
    };
  }, []);

  return scrollHeight;
}

export default useDocumentHeight;
