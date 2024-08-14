import React from "react";
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
  hasOnScrollFetch: boolean; // 是否啟用onScrollFetch
}

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
  hasOnScrollFetch
}) => {
  return (
    <div ref={tbodyRef} className="yh-table-container" onScroll={onScroll}>
    {virtualScroll ? (
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className={`yh-table ${className}`}>
          <tbody>
            {virtualScroll && rowHeight > 0 && containerHeight > 0 
              ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = tableData[virtualRow.index];
                  if (virtualRow.index >= tableData.length) {
                    return (
                      <tr
                        key={`loader-${index}`}
                        style={{
                          height: `${rowHeight}px`,
                          transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                        }}
                      >
                        <td
                          colSpan={columns.length}
                          className="yh-table-loader"
                        >
                          {hasOnScrollFetch && hasNextPage.current ? (
                            <div className="yh-css-loader mx-auto"></div>
                          ) : hasOnScrollFetch ? (
                            "無更多資料"
                          ) : null}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <VirtualTableRow
                      key={row?.id || index}
                      index={index}
                      row={row}
                      virtualRow={virtualRow}
                      columns={columns}
                      scrollInfo={scrollInfo}
                    />
                  );
                })
              : tableData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    index={rowIndex}
                    row={row}
                    columns={columns}
                    scrollInfo={scrollInfo}
                  />
                ))}
          </tbody>
        </table>
      </div>
    ) : (
      <table className="yh-table">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              index={rowIndex}
              row={row}
              columns={columns}
              scrollInfo={scrollInfo}
            />
          ))}
        </tbody>
      </table>
    )}
  </div>
);
};

export default TableBody;
