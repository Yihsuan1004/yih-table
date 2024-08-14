import React from "react";
import { ScrollInfo, TableProps } from "./interface";
import { Virtualizer } from "@tanstack/react-virtual";
import { TableRow, VirtualTableRow } from "./TableRow";

interface TableBodyProps {
  virtualScroll: boolean;
  rowHeight: number;
  containerHeight: number;
  virtualizer: Virtualizer<any, any>;
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
  columns,
  hasNextPage,
  tbodyRef,
  scrollInfo,
  onScroll,
  hasOnScrollFetch
}) => {
  return (
    <div ref={tbodyRef} className="yh-table-container" onScroll={onScroll}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="yh-table">
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
                          transform: `translateY(${virtualRow!.start - index * virtualRow!.size }px)`,
                        }}
                      >
                        <td
                          colSpan={columns.length}
                          className="yh-table-loader"
                        >
                          {hasNextPage.current && hasOnScrollFetch? <div className="yh-css-loader mx-auto"></div> : "無更多資料"}
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
    </div>
  );
};

export default TableBody;
