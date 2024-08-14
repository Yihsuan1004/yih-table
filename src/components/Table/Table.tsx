import React, { useEffect, useRef, useState } from "react";
import "./table.scss";
import { TableProps, TableState } from "./interface";
import { SortOrderEnum } from "./enum";
import { RecordType } from "../../util/type";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { TableRow, VirtualTableRow } from "./TableRow";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import useSort from "./hooks/useSort";
import useSyncedScroll from "./hooks/useSyncedScroll";
import TableCell from "./TableCell";
import { useScrollFetch } from "./hooks/useScrollFetch";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table: React.FC<TableProps> = ({
  columns,
  className,
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
  const { rowHeight, containerHeight, containerRef } = useVirtualScroll();
  const [theadRef, tbodyRef] = useSyncedScroll<HTMLDivElement, HTMLDivElement>({externalRef1: undefined, externalRef2: containerRef});
  const virtualizerRef = useRef<Virtualizer<any, any> | null>(null);

  const {
    setOffset,
    hasNextPage,
    handleScrollFetch,
    loading,
  } = useScrollFetch({
    virtualScroll,
    onScrollFetch,
    virtualizer: virtualizerRef.current,
    tableData,
    setTableData
  });

  const virtualizer = useVirtualizer({
    count: hasNextPage ? tableData.length + 1 : tableData.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 50,
    overscan: 20,
    onChange: (instance) => {
      const [lastItem] = [...instance.getVirtualItems()].reverse();
      if (lastItem && lastItem.index >= tableData.length - 1 && hasNextPage && !loading) {
        handleScrollFetch();
      }
    },
  });

  useEffect(() => {
    virtualizerRef.current = virtualizer;
  }, [virtualizer]);

  const handleTableChange = (newTableState: TableState) => {
    setTableData(newTableState.currentData || []);
    setTableState(newTableState);
    onChange?.(newTableState);
  };

  const { sortConfig, handleSort } = useSort({
    data,
    initialSortConfig: tableState.sorter,
    onTableChange: handleTableChange,
  });

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
    <div className={`yh-table-outer-container ${className}`}>
      <div ref={theadRef} className="yh-table-head-container">
        <TableHeader
          columns={columns}
          handleSort={handleSort}
          tableState={tableState}
        />
      </div>
      <TableBody
        virtualScroll={virtualScroll}
        rowHeight={rowHeight}
        containerHeight={containerHeight}
        virtualizer={virtualizer}
        tableData={tableData}
        columns={columns}
        hasNextPage={hasNextPage}
        tbodyRef={tbodyRef}
      />
    </div>
  );
};

export default Table;
