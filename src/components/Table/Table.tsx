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
  headClassName,
  bodyClassName,
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
  const {rowHeight, containerHeight, containerRef } = useVirtualScroll();
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({ left: 0, right: 0, top: 0, bottom: 0 });
  const [theadRef, tbodyRef] = useSyncedScroll<HTMLDivElement, HTMLDivElement>({externalRef1: undefined, externalRef2: containerRef});
  const virtualizerRef = useRef<Virtualizer<any, any> | null>(null);

  /**
   * 處理表格滾動事件
   * 滾動的時候紀錄滾動的left和right
   */
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setScrollInfo((prevInfo) => {
      const newLeft = target.scrollLeft;
      const newTop = target.scrollTop;
      const newBottom = target.scrollHeight - target.clientHeight - newTop;
      const newRight = target.scrollWidth - target.clientWidth - newLeft;
      if (prevInfo.left !== newLeft || prevInfo.right !== newRight || prevInfo.top !== newTop || prevInfo.bottom !== newBottom) {
        return { left: newLeft, right: newRight, top: newTop, bottom: newBottom };
      }
      return prevInfo;
    });
  }, []);

  
  const throttledHandleScroll = useThrottle(handleScroll, 100);

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

  /**
   * 處理表格資料變動(排序、過濾、分頁)
   * @param newTableState 
   */
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
        className={headClassName}
        theadRef={theadRef}
        columns={columns}
        handleSort={handleSort}
        tableState={tableState}
        scrollInfo={scrollInfo}
      />
      <TableBody
        className={bodyClassName}
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
        hasOnScrollFetch={!!onScrollFetch} 
      />
    </div>
  );
};

export default Table;
