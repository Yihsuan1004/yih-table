import React, { useCallback, useEffect, useRef, useState } from "react";
import "./table.scss";
import { SortFunction, TableProps, TableState } from "./interface";
import { SortOrderEnum } from "./enum";
import { RecordType } from "../../util/type";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { TableRow, VirtualTableRow } from "./TableRow";
import { useVirtualizer } from "@tanstack/react-virtual";
import useSort from "./hooks/useSort";

const Table: React.FC<TableProps> = ({
  columns,
  onChange,
  onScrollFetch,
  data,
  virtualScroll = false,
}) => {
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>(data);
  const [tableState, setTableState] = useState<TableState>({
    sorter: { field: "", sortOrder: SortOrderEnum.DESCEND },
    currentData: [] as RecordType[],
  });
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const { rowHeight, containerHeight, containerRef } = useVirtualScroll();
  const hasNextPage = useRef(true);



  const virtualizer = useVirtualizer({
    count: hasNextPage.current ? tableData.length + 1 : tableData.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 50,
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
    handleTableChange({
      sorter: sortConfig,
      currentData: data,
    });
  };

  const handleScrollFetch = useCallback(async () => {
    if (!virtualScroll || loading || !hasNextPage.current || !onScrollFetch) return;
    setLoading(true);

    const nextPageData = (await onScrollFetch(offset)).data; 
    console.log("nextPageData", nextPageData);

    if (nextPageData.length === 0) {
      hasNextPage.current = false;
    } else {
      setTableData(prevData => [...prevData, ...nextPageData]);
      setOffset(prevOffset => prevOffset + nextPageData.length);
    }
    setLoading(false);
  }, [virtualScroll, loading, onScrollFetch, offset]);



  useEffect(() => {
    if (!onScrollFetch) return; 
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (lastItem && lastItem.index >= tableData.length - 1 && hasNextPage.current && !loading) {
      handleScrollFetch();
    }
  }, [handleScrollFetch, loading,virtualizer, virtualizer.getVirtualItems(), tableData.length, onScrollFetch]);
    

  useEffect(() => {
    setTableState((prevState) => ({
      ...prevState,
      sorter: sortConfig,
    }));
  }, [sortConfig]);

  useEffect(() => {
    setOffset(data.length);
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
                  const isLoaderRow = virtualRow.index >= tableData.length - 1
                  const row = tableData[virtualRow.index];
                  if(isLoaderRow){
                    if(hasNextPage.current){
                      return <tr key={index}><td colSpan={columns.length}>載入中...</td></tr>
                    }
                    return <tr key={index}><td colSpan={columns.length}>無更多資料</td></tr>
                  }
                  return(
                    <VirtualTableRow
                      key={row?.id || index}
                      index={index}
                      row={row}
                      virtualRow={virtualRow}
                      columns={columns}
                    />
                  )
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
