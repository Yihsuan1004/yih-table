import React from "react";
import TableCell from "./TableCell";
import { TableRowProps } from "./interface";

export const TableRow: React.FC<TableRowProps> = ({
  index,
  className,
  row,
  columns,
}) => {
  return (
    <tr className={className} key={index}>
      {columns.map((column, colIndex) => {
        const isFixedLeft = column.fixed === "left";
        const isFixedRight = column.fixed === "right";

        return (
          <TableCell
            key={column.field}
            column={column}
            row={row}
            colIndex={colIndex}
            columns={columns}
            isFixedLeft={isFixedLeft}
            isFixedRight={isFixedRight}
          />
        );
      })}
    </tr>
  );
};

export const VirtualTableRow: React.FC<TableRowProps> = ({
  virtualRow,
  index,
  className,
  row,
  columns,
}) => {
  return (
    <tr
      className={className}
      key={row.id}
      style={{
        height: `${virtualRow?.size}px`,
        transform: `translateY(${virtualRow!.start - index * virtualRow!.size}px)`,
      }}
    >
      {columns.map((column, colIndex) => {
        const isFixedLeft = column.fixed === "left";
        const isFixedRight = column.fixed === "right";

        return (
          <TableCell
            key={column.field}
            column={column}
            row={row}
            colIndex={colIndex}
            columns={columns}
            isFixedLeft={isFixedLeft}
            isFixedRight={isFixedRight}
          />
        );
      })}
    </tr>
  );
};
