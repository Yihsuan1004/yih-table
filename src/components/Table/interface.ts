import { RecordType } from "../../util/type";

/** 排序方向 */
export type SortOrder = "descend" | "ascend";
/** 固定欄位方向 */
export type FixedDirection = "left" | "right";
/** 排序函數 */
export type SortFunction = ((a: any, b: any, sortOrder: SortOrder) => number) | boolean;
/** 虛擬滾動時的資料載入函數 */
export type ScrollFetchDataFunction<T = any> = (offset: number, limit?: number) => Promise<ScrollFetchDataResult<T>>;
/** 虛擬滾動時的資料載入函數的結果 */
export type ScrollFetchDataResult<T> = {
  data: T[];
  nextOffset: number; // 下一個偏移量
  hasMore: boolean; // 是否還有更多資料
};
export type ScrollInfo = { left: number; right: number , top: number, bottom: number};

// 表格的列
export interface TableRow extends RecordType {}


// 表格的欄
export interface TableColumn {
  field: string; // 欄位名稱
  title: string; // 欄位標題
  fixed?: FixedDirection;
  sortable?: boolean; // 是否可排序
  sortIcon?: React.ReactNode; // 自訂排序圖標
  width?: number | string;
  /** 自定義排序函數，若設置為true則代表使用後端排序，會透過onChange回傳sortConfig給父元件 */
  customSort?: ((a: any, b: any, sortOrder: SortOrder) => number) | boolean; 
  render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數
}

// 表格的props
export interface TableProps {
  data: RecordType[]; 
  columns: TableColumn[]; 
  virtualScroll?: boolean; // 是否啟用虛擬滾動
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
  onChange?: (state: TableState) => void;
  onScrollFetch?: ScrollFetchDataFunction; // 虛擬滾動時的資料載入函數
}

// 表格的state
export interface TableState {
  sorter: SortConfig; //
  currentData?: RecordType[]; 
}

// 排序的設定
export interface SortConfig {
  field: string; // 排序的欄位
  sortOrder: SortOrder; // 排序的方向
}


