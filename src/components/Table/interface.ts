import { RecordType } from "../../util/type";

export type SortOrder = "descend" | "ascend";
export type FixedDirection = "left" | "right";

// 表格的列欄位
export interface TableRow extends RecordType {};

// 表格的欄位
export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  fixed?: FixedDirection;
  customSort?: (a: any, b: any) => number; // 自定義排序函數
  render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數
}

// 表格的props
export interface TableProps {
  data: RecordType[];
  columns: Column[];
  onSort?: (key: string, direction: SortOrder) => void;
  fetchData?: (
    sortKey: string,
    sortOrder: SortOrder
  ) => Promise<{ [key: string]: any }[]>;
}
