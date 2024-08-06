export type SortOrder = "descend" | "ascend";
export type FixedDirection = "left" | "right";

// 表格的列欄位
export interface TableRow {
  [key: string]: any;
}

// 表格的欄位
export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  fixed?: FixedDirection;
  render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數
}

// 表格的props
export interface TableProps {
  data: { [key: string]: any }[];
  columns: Column[];
  onSort?: (key: string, direction: SortOrder) => void;
  fetchData: (
    sortKey: string,
    sortOrder: SortOrder
  ) => Promise<{ [key: string]: any }[]>;
}
