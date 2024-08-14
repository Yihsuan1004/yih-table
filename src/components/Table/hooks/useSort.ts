import { useCallback, useMemo, useState } from 'react';
import { SortConfig, SortFunction, SortOrder, TableState } from '../interface';
import { SortOrderEnum } from '../enum';
import { RecordType } from '../../../util/type';

interface SortResult {
    data: RecordType[];    
    sortConfig: SortConfig;
}


interface UseSortProps {
  data: RecordType[]; // 資料
  initialSortConfig: SortConfig; // 初始排序設定
  onTableChange: (newTableState: TableState) => void; // 更新表格狀態
}

/**
 * 處理排序
 * @param data 資料
 * @param initialSortConfig 初始排序設定
 * @param onTableChange 
 * @returns 
 */
const useSort = ({ data, initialSortConfig, onTableChange }: UseSortProps) => {

  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSortConfig);

  // 預設的排序方法
  const defaultSortData = useMemo(() => {
    return (data: RecordType[], field: string, sortOrder: SortOrder, customSort?: SortFunction) => {
      return [...data].sort((a, b) => {
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
    };
  }, []);
  /**
   * 執行排序操作
   * @param {string} field - 要排序的欄位名稱
   * @param {SortFunction} [customSort] - 自定義排序函數
   * @returns {SortResult} 包含排序後的資料和更新後的排序配置
   */
  const onSort = useCallback((field: string, customSort?: SortFunction): SortResult => {
    const sortOrder = sortConfig.field === field && sortConfig.sortOrder === SortOrderEnum.ASCEND
      ? SortOrderEnum.DESCEND
      : SortOrderEnum.ASCEND;
  
    const updatedSortConfig = { field, sortOrder };
    setSortConfig(updatedSortConfig);
  
    if (customSort === true) {
      return { data, sortConfig: updatedSortConfig };
    }
  
    const sortedData = defaultSortData(data, field, sortOrder, typeof customSort === 'function' ? customSort : undefined);
  
    return { data: sortedData, sortConfig: updatedSortConfig };
  }, [data, sortConfig, defaultSortData]);

  const handleSort = useCallback(
    (field: string, customSort?: SortFunction) => {
      const { data: sortedData, sortConfig: newSortConfig } = onSort(field, customSort);
      onTableChange({
        sorter: newSortConfig,
        currentData: sortedData,
      });
    },
    [onSort, onTableChange]
  );

  return { onSort, sortConfig, handleSort };

 
};

export default useSort;
