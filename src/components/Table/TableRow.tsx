import React from "react";
import TableCell from "./TableCell";
import { RecordType } from "../../util/type";
import { VirtualItem } from "@tanstack/react-virtual";
import { ScrollInfo, TableColumn, TableProps } from "./interface";


interface TableRowProps {
  index: number;
  tableRef: React.RefObject<HTMLTableElement>;
  row: RecordType;
  columns: TableColumn[];
  className?: string;
  virtualRow?: VirtualItem<Element>
  scrollInfo?: ScrollInfo;
}

interface LoaderRowProps {
  rowHeight: number;
  columns: TableColumn[];
  hasOnScrollFetch: boolean;
  hasNextPage: React.MutableRefObject<boolean>;
  virtualRow: any;
  index: number;
}

export const TableRow: React.FC<TableRowProps> = ({
  index,
  tableRef,
  scrollInfo,
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
            tableRef={tableRef} 
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

export const VirtualTableRow: React.FC<TableRowProps> = ({
  tableRef,
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
            tableRef={tableRef} 
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

export const LoaderRow: React.FC<LoaderRowProps> = (
  ({
    rowHeight,
    columns,
    hasOnScrollFetch,
    hasNextPage,
    virtualRow,
    index,
  }) => {
    return(
    <tr
      style={{
        height: `${rowHeight}px`,
        transform: `translateY(${virtualRow!.start - index * virtualRow!.size}px)`,
      }}
    >
      <td colSpan={columns.length} className="yh-table-loader">
        {hasOnScrollFetch && hasNextPage.current ? (
          <div className="yh-css-loader mx-auto"></div>
        ) : (
          "無更多資料"
        )}
      </td>
    </tr>
  )
  }
);
