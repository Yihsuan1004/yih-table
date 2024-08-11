import React, { useEffect, useState } from "react";
import { SortFunction, TableProps, TableState } from "./interface";
import { SortOrderEnum } from "./enum";
import { RecordType } from "../../util/type";
import "./table.scss";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import useSort from "./hooks/useSort";
import { TableRow, VirtualTableRow } from "./TableRow";
import { useVirtualizer } from "@tanstack/react-virtual";

const Table: React.FC<TableProps> = ({
  columns,
  onChange,
  data,
  virtualScroll = false,
}) => {
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>(data);
  const [tableState, setTableState] = useState<TableState>({
    sorter: { field: "", sortOrder: SortOrderEnum.DESCEND },
    currentData: [] as RecordType[],
  });

  const { rowHeight, containerHeight, containerRef } = useVirtualScroll();

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  const { onSort, sortConfig } = useSort(data, tableState.sorter);

  const handleTableChange = (newTableState: TableState) => {
    setTableData(newTableState.currentData || []);
    setTableState(newTableState);
    onChange?.(newTableState);
  };

  const handleSort = (field: string, customSort?: SortFunction) => {
    const { data, sortConfig } = onSort(field, customSort);
    // 更新表格狀態
    console.log("data", data);
    handleTableChange({
      sorter: sortConfig,
      currentData: data,
    });
  };

  useEffect(() => {
    setTableState((prevState) => ({
      ...prevState,
      sorter: sortConfig,
    }));
  }, [sortConfig]);

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  return (
    <div ref={containerRef} className="yh-table-container">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="yh-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className="yh-table-head yh-table-cell"
                  key={column.field}
                  onClick={() =>
                    column.sortable &&
                    handleSort(column.field, column.customSort)
                  }
                  style={{
                    position: column.fixed ? "sticky" : "static",
                    [column.fixed || ""]: 0,
                  }}
                >
                  {column.title}{" "}
                  {tableState.sorter?.field === column.field
                    ? tableState.sorter.sortOrder === SortOrderEnum.ASCEND
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {virtualScroll && rowHeight > 0 && containerHeight > 0
              ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = tableData[virtualRow.index];
                  return (
                    <VirtualTableRow
                      key={row.id}
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
};

export default Table;
