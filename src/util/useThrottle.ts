import { useCallback, useRef } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const lastCall = useRef(0);
  const lastCallTimer = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      func(...args);
      lastCall.current = now;
    } else {
      if (lastCallTimer.current) {
        clearTimeout(lastCallTimer.current);
      }
      lastCallTimer.current = setTimeout(() => {
        func(...args);
        lastCall.current = Date.now();
      }, delay - (now - lastCall.current));
    }
  }, [func, delay]) as T;
}