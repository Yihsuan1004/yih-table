import React from "react";
import { SortFunction, TableProps, TableState } from "./interface";
import TableCell from "./TableCell";

interface TableHeaderProps {
  columns: TableProps['columns'];
  handleSort: (field: string, customSort?: SortFunction) => void;
  tableState: TableState;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, handleSort, tableState }) => (
  <div className="yh-table-head-container">
    <table className="yh-table">
      <thead>
        <tr>
          {columns.map((column, colIndex) => (
            <TableCell
              key={column.field}
              column={column}
              colIndex={colIndex}
              columns={columns}
              isFixedLeft={column.fixed === 'left'}
              isFixedRight={column.fixed === 'right'}
              isHeader={true}
              onClick={() => column.sortable && handleSort(column.field, column.customSort)}
              tableState={tableState}
            />
          ))}
        </tr>
      </thead>
    </table>
  </div>
);

export default TableHeader;