import { useEffect, useRef, RefObject } from 'react';

const useSyncedScroll = <T extends HTMLElement, U extends HTMLElement>(
  externalRef1?: RefObject<T>, // 接受外部傳入的ref
  externalRef2?: RefObject<U>  // 接受外部傳入的ref
) => {
  const internalRef1 = useRef<T>(null);
  const internalRef2 = useRef<U>(null);

  const ref1 = externalRef1 || internalRef1; 
  const ref2 = externalRef2 || internalRef2; 

  useEffect(() => {
    console.log('scroll',ref1, ref2);
    
    const handleScroll = () => {
      if (ref1.current && ref2.current) {
        ref1.current.scrollLeft = ref2.current.scrollLeft;
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
