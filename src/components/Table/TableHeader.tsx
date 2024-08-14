import React from "react";
import { SortFunction, TableProps, TableState } from "./interface";
import TableCell from "./TableCell";

interface TableHeaderProps {
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
}) => (
  <div className="yh-table-head-container" ref={theadRef}>
    <table className={`yh-table ${className}`}>
      <colgroup>
        {columns.map((column, colIndex) => (
          <col key={colIndex} style={{ width: column.width }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map((column, colIndex) => (
            <TableCell
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
);

export default TableHeader;
