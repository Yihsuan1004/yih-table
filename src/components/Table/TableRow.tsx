import React from "react";
import TableCell from "./TableCell";
import { RecordType } from "../../util/type";
import { VirtualItem } from "@tanstack/react-virtual";
import { ScrollInfo, TableColumn } from "./interface";


interface TableRowProps {
  index: number;
  className?: string;
  row: RecordType;
  virtualRow?: VirtualItem<Element>
  columns: TableColumn[];
  scrollInfo?: ScrollInfo;
}

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
  scrollInfo,
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
            scrollInfo={scrollInfo}
          />
        );
      })}
    </tr>
  );
};
