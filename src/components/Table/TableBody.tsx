import React from "react";
import { TableProps } from "./interface";
import { Virtualizer } from "@tanstack/react-virtual";
import { TableRow, VirtualTableRow } from "./TableRow";

interface TableBodyProps {
  virtualScroll: boolean;
  rowHeight: number;
  containerHeight: number;
  virtualizer: Virtualizer<any, any>;
  tableData: any[];
  columns: TableProps['columns'];
  hasNextPage: React.MutableRefObject<boolean>;
  tbodyRef: React.RefObject<HTMLDivElement>;
}

const TableBody: React.FC<TableBodyProps> = ({
  virtualScroll,
  rowHeight,
  containerHeight,
  virtualizer,
  tableData,
  columns,
  hasNextPage,
  tbodyRef
}) => (
  <div ref={tbodyRef}  className="yh-table-container">
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <table className="yh-table">
        <tbody>
          {virtualScroll && rowHeight > 0 && containerHeight > 0
            ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                const isLoaderRow = virtualRow.index >= tableData.length - 1;
                const row = tableData[virtualRow.index];
                if (isLoaderRow) {
                  return hasNextPage.current ? (
                    <tr key={index}><td colSpan={columns.length}>載入中...</td></tr>
                  ) : (
                    <tr key={index}><td colSpan={columns.length}>無更多資料</td></tr>
                  );
                }
                return (
                  <VirtualTableRow
                    key={row?.id || index}
                    index={index}
                    row={row}
                    virtualRow={virtualRow}
                    columns={columns}
                  />
                );
              })
            : tableData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  index={rowIndex}
                  row={row}
                  columns={columns}
                />
              ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableBody;