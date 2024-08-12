import { RecordType } from "../../util/type";
import { VirtualItem } from '@tanstack/react-virtual';

export type SortOrder = "descend" | "ascend";
export type FixedDirection = "left" | "right";
export type SortFunction = ((a: any, b: any, sortOrder: SortOrder) => number) | boolean;
export type ScrollFetchDataFunction<T = any> = (offset: number, limit?: number) => Promise<ScrollFetchDataResult<T>>;
export type ScrollFetchDataResult<T> = {
  data: T[];
  nextOffset: number;
  hasMore: boolean;
};

// 表格的列欄位
export interface TableRow extends RecordType {}

export interface TableRowProps {
  index: number;
  className?: string;
  row: RecordType;
  virtualRow?: VirtualItem<Element>
  columns: { field: string; render?: (value: any, record: RecordType) => React.ReactNode }[];
}


// 表格的欄位
export interface TableColumn {
  field: string; // 欄位名稱
  title: string; // 欄位標題
  fixed?: FixedDirection;
  sortable?: boolean; // 是否可排序
  sortIcon?: React.ReactNode; // 自訂排序圖標
  /** 自定義排序函數，若設置為true則代表使用後端排序，會透過onChange回傳sortConfig給父元件 */
  customSort?: ((a: any, b: any, sortOrder: SortOrder) => number) | boolean; 
  render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數
}

// 表格的props
export interface TableProps {
  data: RecordType[]; 
  columns: TableColumn[]; 
  virtualScroll?: boolean;
  onChange?: (state: TableState) => void;
  onScrollFetch?: ScrollFetchDataFunction;
}


export interface TableState {
  sorter: SortConfig;
  currentData?: RecordType[];
}


export interface TableState {
  sorter: SortConfig;
  currentData?: RecordType[];
}


export interface ScrollState {
  offset: number;
}



export interface SortConfig {
  field: string;
  sortOrder: SortOrder;
}


