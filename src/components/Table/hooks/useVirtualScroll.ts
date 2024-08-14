import { useState, useEffect, useRef } from 'react';


/**
 * 虛擬滾動
 * @returns 
 */

export const useVirtualScroll = () => {
  const [rowHeight, setRowHeight] = useState(0); // 行高
  const [containerHeight, setContainerHeight] = useState(0); // 容器高度
  const containerRef = useRef<HTMLDivElement | null>(null); // 容器ref

  useEffect(() => {
    // 計算行高和容器高度
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
    
    // 監聽視窗大小變化
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return { rowHeight, containerHeight, containerRef };
};
