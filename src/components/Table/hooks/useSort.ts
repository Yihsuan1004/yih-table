import { useMemo, useState } from 'react';
import { SortConfig } from '../interface';
import { SortOrderEnum } from '../enum';
import { RecordType } from '../../../util/type';

interface SortResult {
    data: RecordType[];    
    sortConfig: SortConfig;
  }

const useSort = (data: RecordType[], initialSortConfig: SortConfig) => {

  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSortConfig);
  const [useOriginalData, setUseOriginalData] = useState(false);  //判斷是否使用原始資料

  // 預設的排序方法
  const defaultSort = (a: any, b: any, key: string) => {
    const valA = a[key];
    const valB = b[key];
  
    if (typeof valA === 'number' && typeof valB === 'number') {
      return valA - valB;
    }
  
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB);
    }
  
    //其他類型轉換為字串後進行比較
    return String(valA).localeCompare(String(valB));
};

const sortedData = useMemo(() => {
    if (useOriginalData) {
      return data;
    }
    return [...data].sort((a, b) => {
      const { field, sortOrder } = sortConfig;
      const sortValue = defaultSort(a, b, field);
      return sortOrder === SortOrderEnum.ASCEND ? sortValue : -sortValue;
    });
  }, [data, sortConfig, useOriginalData]); 

  /**
   * 排序
   * @param field   排序欄位
   * @param customSort 自訂排序方法
   * @returns 
   */
  const onSort = (field: string, customSort?: ((a: any, b: any) => number) | boolean) : SortResult =>   {
    let sortOrder = SortOrderEnum.ASCEND;

    if (
      sortConfig.field === field &&
      sortConfig.sortOrder === SortOrderEnum.ASCEND
    ) {
      sortOrder = SortOrderEnum.DESCEND;
    }
    setSortConfig({ field, sortOrder });

    // 若customSort為true，表示要使用後端排序，則回傳原始資料和排序設定
    if (customSort === true) {
        setUseOriginalData(true);
        return { data, sortConfig };
    }

    // 若customSort為function，表示要使用自訂排序方法，則回傳排序後的資料和排序設定
    if (typeof customSort === 'function') {
      const sortedWithCustomSort = [...data].sort(customSort);
      setUseOriginalData(false);
      return { data: sortedWithCustomSort, sortConfig };
    }

    // 否則，使用預設排序方法，回傳排序後的資料和排序設定
    setUseOriginalData(false);
    return { data: sortedData, sortConfig };
  };

  return { data: sortedData, onSort, sortConfig };
};

export default useSort;
