import { useEffect, useRef, RefObject } from 'react';

interface UseSyncedScrollProps<T, U> {
  externalRef1?: RefObject<T> | undefined;
  externalRef2?: RefObject<U> | undefined;
}

/**
 * 同步兩個元素的滾動位置
 * @param externalRef1 外部傳入的ref
 * @param externalRef2 外部傳入的ref
 * @returns 
 */ 
const useSyncedScroll = <T extends HTMLElement, U extends HTMLElement>(
  { externalRef1, externalRef2 }: UseSyncedScrollProps<T, U>
) => {
  const internalRef1 = useRef<T>(null);
  const internalRef2 = useRef<U>(null);

  const ref1 = externalRef1 || internalRef1; 
  const ref2 = externalRef2 || internalRef2; 

  useEffect(() => {

    const handleScroll = () => {
      if (ref1.current && ref2.current) {
        console.log('handleScroll',ref1,ref2.current.scrollLeft);
        ref1.current.scrollLeft = ref2.current.scrollLeft;
        console.log('handleScroll',ref1.current.scrollLeft);

      }
    };

    const ref2Element = ref2.current;
    if (ref2Element) {
      ref2Element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref2Element) {
        ref2Element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref1, ref2]);

  return [ref1, ref2] as const;
};

export default useSyncedScroll;
