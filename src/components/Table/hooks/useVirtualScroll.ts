import { useState, useEffect, useRef } from 'react';

export const useVirtualScroll = () => {
  const [rowHeight, setRowHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
     const container = containerRef.current;
      if (container) {          
        const containerRect = container.getBoundingClientRect();
        setContainerHeight(containerRect.height);
        
        const firstRow = container.querySelector('tr');
        if (firstRow) {
          setRowHeight(firstRow.getBoundingClientRect().height);
        }
      }
    };

    calculateHeight();
    
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return { rowHeight, containerHeight, containerRef };
};
