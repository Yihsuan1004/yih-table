import React, { useRef, memo } from "react";
import { ScrollInfo, TableProps } from "./interface";
import { Virtualizer } from "@tanstack/react-virtual";
import { TableRow, VirtualTableRow } from "./TableRow";

interface TableBodyProps {
  virtualScroll: boolean;
  rowHeight: number;
  containerHeight: number;
  virtualizer: Virtualizer<any, any>;
  className?: string;
  tableData: any[];
  columns: TableProps["columns"];
  hasNextPage: React.MutableRefObject<boolean>;
  tbodyRef: React.RefObject<HTMLDivElement>;
  scrollInfo: ScrollInfo;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  hasOnScrollFetch: boolean;
}

interface LoaderRowProps {
  rowHeight: number;
  columns: TableProps["columns"];
  hasOnScrollFetch: boolean;
  hasNextPage: React.MutableRefObject<boolean>;
  virtualRow: any;
  index: number;
}

interface VirtualRowProps {
  virtualizer: Virtualizer<any, any>;
  tableData: any[];
  columns: TableProps["columns"];
  scrollInfo: ScrollInfo;
  hasOnScrollFetch: boolean;
  hasNextPage: React.MutableRefObject<boolean>;
  rowHeight: number;
  tableRef: React.RefObject<HTMLTableElement>;
}

const LoaderRow = memo(
  ({
    rowHeight,
    columns,
    hasOnScrollFetch,
    hasNextPage,
    virtualRow,
    index,
  }: LoaderRowProps) => (
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
);

const VirtualRows = memo(
  ({
    virtualizer,
    tableData,
    columns,
    scrollInfo,
    hasOnScrollFetch,
    hasNextPage,
    rowHeight,
    tableRef,
  }: VirtualRowProps) => (
    <>
      {virtualizer.getVirtualItems().map((virtualRow, index) => {
        const row = tableData[virtualRow.index];
        if (virtualRow.index >= tableData.length) {
          return (
            <LoaderRow
              key={`loader-${index}`}
              rowHeight={rowHeight}
              columns={columns}
              hasOnScrollFetch={hasOnScrollFetch}
              hasNextPage={hasNextPage}
              virtualRow={virtualRow}
              index={index}
            />
          );
        }
        return (
          <VirtualTableRow
            tableRef={tableRef}
            key={row?.id || index}
            index={index}
            row={row}
            virtualRow={virtualRow}
            columns={columns}
            scrollInfo={scrollInfo}
          />
        );
      })}
    </>
  )
);

const NonVirtualRows = memo(
  ({
    tableData,
    columns,
    scrollInfo,
    tableRef,
  }: {
    tableData: any[];
    columns: TableProps["columns"];
    scrollInfo: ScrollInfo;
    tableRef: React.RefObject<HTMLTableElement>;
  }) => (
    <>
      {tableData.map((row, rowIndex) => (
        <TableRow
          tableRef={tableRef}
          key={rowIndex}
          index={rowIndex}
          row={row}
          columns={columns}
          scrollInfo={scrollInfo}
        />
      ))}
    </>
  ),
  (prevProps, nextProps) => {
    return prevProps.tableData.length === nextProps.tableData.length;
  }
);

const TableBody: React.FC<TableBodyProps> = ({
  virtualScroll,
  rowHeight,
  containerHeight,
  virtualizer,
  tableData,
  className,
  columns,
  hasNextPage,
  tbodyRef,
  scrollInfo,
  onScroll,
  hasOnScrollFetch,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div ref={tbodyRef} className="yh-table-body-container" onScroll={onScroll}>
      {virtualScroll ? (
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <table
            className={`yh-table yh-table-virtual ${className || ""}`}
            ref={tableRef}
          >
            <tbody>
              {rowHeight > 0 && containerHeight > 0 ? (
                <VirtualRows
                  virtualizer={virtualizer}
                  tableData={tableData}
                  columns={columns}
                  scrollInfo={scrollInfo}
                  hasOnScrollFetch={hasOnScrollFetch}
                  hasNextPage={hasNextPage}
                  rowHeight={rowHeight}
                  tableRef={tableRef}
                />
              ) : (
                <NonVirtualRows
                  tableData={tableData}
                  columns={columns}
                  scrollInfo={scrollInfo}
                  tableRef={tableRef}
                />
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <table className="yh-table" ref={tableRef}>
          <tbody>
            <NonVirtualRows
              tableData={tableData}
              columns={columns}
              scrollInfo={scrollInfo}
              tableRef={tableRef}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableBody;
