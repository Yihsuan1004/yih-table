import { RecordType } from "../../util/type";

export type SortOrder = "descend" | "ascend";
export type FixedDirection = "left" | "right";

// 表格的列欄位
export interface TableRow extends RecordType {}

// 表格的欄位
export interface Column {
  field: string; // 欄位名稱
  title: string; // 欄位標題
  fixed?: FixedDirection;
  sortable?: boolean; // 是否可排序
  sortIcon?: React.ReactNode; // 自訂排序圖標
  /** 自定義排序函數，若設置為true則代表使用後端排序，會透過onChange回傳sortConfig給父元件 */
  customSort?: ((a: any, b: any) => number) | boolean; 
  render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數
}

// 表格的props
export interface TableProps {
  data: RecordType[];
  columns: Column[];
  onChange?: (state: TableState) => void;
}


export interface TableState {
  sorter: SortConfig;
  currentData?: RecordType[];
}



export interface SortConfig {
  field: string;
  sortOrder: SortOrder;
}
