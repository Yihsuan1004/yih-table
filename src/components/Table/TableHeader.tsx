import React, { useRef } from "react";
import { SortFunction, TableProps, TableState } from "./interface";
import TableCell from "./TableCell";

export interface TableHeaderProps {
  columns: TableProps["columns"];
  handleSort: (field: string, customSort?: SortFunction) => void;
  tableState: TableState;
  className?: string;
  scrollInfo: {
    left: number;
    right: number;
  };
  theadRef: React.RefObject<HTMLDivElement>;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  handleSort,
  tableState,
  scrollInfo,
  className,
  theadRef,
}) => {

  const tableRef = useRef<HTMLTableElement>(null);

  return(
  <div className="yh-table-head-container" ref={theadRef}>
    <table ref={tableRef} className={`yh-table yh-table-virtual ${className || ''}`}>
      <colgroup>
        {columns.map((column, colIndex) => (
          <col key={colIndex} style={{ width: column.width }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map((column, colIndex) => (
            <TableCell
              tableRef={tableRef}
              key={column.field}
              column={column}
              colIndex={colIndex}
              columns={columns}
              isFixedLeft={column.fixed === "left"}
              isFixedRight={column.fixed === "right"}
              isHeader={true}
              onClick={() =>
                column.sortable && handleSort(column.field, column.customSort)
              }
              tableState={tableState}
              scrollInfo={scrollInfo}
            />
          ))}
        </tr>
      </thead>
    </table>
  </div>
)
};

export default TableHeader;
