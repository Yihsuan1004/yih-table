import { useState } from 'react';
import { SortConfig, SortFunction, SortOrder } from '../interface';
import { SortOrderEnum } from '../enum';
import { RecordType } from '../../../util/type';

interface SortResult {
    data: RecordType[];    
    sortConfig: SortConfig;
}


const useSort = (data: RecordType[], initialSortConfig: SortConfig) => {

  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSortConfig);

  // 預設的排序方法
  const sortData = (data: RecordType[], field: string, sortOrder: SortOrder, customSort?: SortFunction) => {
    const sortedData = [...data].sort((a, b) => {
      if (customSort && typeof customSort === 'function') {
        return customSort(a, b, sortOrder);
      }
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === SortOrderEnum.ASCEND ? valA - valB : valB - valA;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === SortOrderEnum.ASCEND ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return 0;
    });

    return sortedData;
  };


  /**
   * 排序
   * @param field   排序欄位
   * @param customSort 自訂排序方法
   * @returns 
   */
  const onSort = (field: string, customSort?: SortFunction) : SortResult =>   {
    let sortOrder = SortOrderEnum.ASCEND;

    if (
      sortConfig.field === field &&
      sortConfig.sortOrder === SortOrderEnum.ASCEND
    ) {
      sortOrder = SortOrderEnum.DESCEND;
    }
    const updatedSortConfig = { field, sortOrder };
    setSortConfig({ field, sortOrder });

    // 若customSort為true，表示要使用後端排序，則回傳原始資料和排序設定
    if (customSort === true) {
        return { data, sortConfig };
    }

    // 若customSort為function，表示要使用自訂排序方法，則回傳排序後的資料和排序設定
    // 否則，使用預設排序方法，回傳排序後的資料和排序設定
    const sortedData = sortData(data, field, sortOrder, typeof customSort === 'function' ? customSort : undefined);

    return { data: sortedData,  sortConfig: updatedSortConfig };
  };

  return { onSort, sortConfig };

};

export default useSort;
