import { useState, useCallback, useRef, useEffect } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';

interface UseScrollFetchProps {
  virtualScroll: boolean;
  onScrollFetch?: (offset: number) => Promise<{ data: any[] }>;
  virtualizer: Virtualizer<any, any> | null;
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const useScrollFetch = ({ 
  virtualScroll, 
  onScrollFetch, 
  virtualizer, 
  tableData, 
  setTableData 
}: UseScrollFetchProps) => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const hasNextPage = useRef(true);
  const handleScrollFetch = useCallback(async () => {
    if (!virtualScroll || loading || !hasNextPage || !onScrollFetch) return;
    setLoading(true);

    try {
      const { data: nextPageData } = await onScrollFetch(offset);
      if (nextPageData.length === 0) {
          hasNextPage.current = false
      } else {
        setOffset((prevOffset) => prevOffset + nextPageData.length);
        return nextPageData;
      }
    } finally {
      setLoading(false);
    }
  }, [virtualScroll, loading, onScrollFetch, offset]);

  useEffect(() => {
    if (!onScrollFetch || !virtualizer) return;
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (
      lastItem &&
      lastItem.index >= tableData.length - 1 &&
      hasNextPage.current &&
      !loading
    ) {
      handleScrollFetch().then(nextPageData => {
        if (nextPageData) {
          setTableData((prevData) => [...prevData, ...nextPageData]);
        }
      });
    }
  }, [
    handleScrollFetch,
    loading,
    virtualizer,
    tableData.length,
    onScrollFetch,
    setTableData
  ]);

  return {
    loading,
    offset,
    setOffset,
    hasNextPage,
    handleScrollFetch
  };
};