import React, { useCallback, useEffect, useRef, useState } from "react";
import "./table.scss";
import { ScrollInfo, TableProps, TableState } from "./interface";
import { SortOrderEnum } from "./enum";
import { RecordType } from "../../util/type";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { useThrottle } from "../../util/useThrottle";
import useSort from "./hooks/useSort";
import useVirtualScroll  from "./hooks/useVirtualScroll";
import useSyncedScroll from "./hooks/useSyncedScroll";
import useScrollFetch  from "./hooks/useScrollFetch";
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
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({ left: 0, right: 0 });
  const [theadRef, tbodyRef] = useSyncedScroll<HTMLDivElement, HTMLDivElement>({externalRef1: undefined, externalRef2: containerRef});
  const virtualizerRef = useRef<Virtualizer<any, any> | null>(null);


  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setScrollInfo({
      left: target.scrollLeft,
      right: target.scrollWidth - target.clientWidth - target.scrollLeft
    });
  }, []);

  const throttledHandleScroll = useThrottle(handleScroll, 100); // 100ms 的節流


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
    overscan: 5,
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
      <TableHeader
        theadRef={theadRef}
        columns={columns}
        handleSort={handleSort}
        tableState={tableState}
        scrollInfo={scrollInfo}
      />
      <TableBody
        virtualScroll={virtualScroll}
        rowHeight={rowHeight}
        containerHeight={containerHeight}
        virtualizer={virtualizer}
        tableData={tableData}
        columns={columns}
        hasNextPage={hasNextPage}
        tbodyRef={tbodyRef}
        scrollInfo={scrollInfo}
        onScroll={throttledHandleScroll}
      />
    </div>
  );
};

export default Table;
