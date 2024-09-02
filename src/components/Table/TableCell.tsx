/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useMemo } from "react";
import { TableColumn } from "./interface";
import { SortOrderEnum } from "./enum";
import ArrowDropUpIcon from "../../assets/arrow_drop_up.svg";
import ArrowDropDownIcon from "../../assets/arrow_drop_down.svg";

interface TableCellProps {
  tableRef: React.RefObject<HTMLTableElement>;
  column: TableColumn;
  colIndex: number;
  columns: TableColumn[];
  isFixedLeft: boolean;
  isFixedRight: boolean;
  row?: any;
  isHeader?: boolean; // 判斷是不是表頭
  tableState?: any;
  scrollInfo?: { left: number; right: number };
  onClick?: () => void;
}

const TableCell: React.FC<TableCellProps> = ({
  tableRef,
  column,
  row,
  colIndex,
  columns,
  isFixedLeft,
  isFixedRight,
  isHeader,
  onClick,
  tableState,
  scrollInfo,
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isFixedLeft || isFixedRight) {
      let offset = 0;

      if (isFixedLeft) {
        for (let i = 0; i < colIndex; i++) {
          const element = tableRef.current?.querySelector<HTMLTableCellElement>(
            `.col-${i}`
          );
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setOffset(offset);
      }

      if (isFixedRight) {
        for (let i = columns.length - 1; i > colIndex; i--) {
          const element = tableRef.current?.querySelector<HTMLTableCellElement>(
            `.col-${i}`
          );
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setOffset(offset);
      }
    }
  }, [colIndex,isFixedLeft, isFixedRight,isHeader]);

  const CellComponent = isHeader ? "th" : "td"; 
  
  const { isLastFixedLeft, isFirstFixedRight, showShadow } = useMemo(() => {
    const isLastFixedLeft = isFixedLeft && colIndex === columns.filter((col) => col.fixed === "left").length - 1;
    const isFirstFixedRight = isFixedRight && colIndex === columns.length - columns.filter((col) => col.fixed === "right").length;
    
    let showShadow = false;
    if (isLastFixedLeft && scrollInfo?.left && scrollInfo.left > 1) {
      showShadow = true;
    } else if (isFirstFixedRight && scrollInfo?.right && scrollInfo.right > 1) {
      showShadow = true;
    }

    return { isLastFixedLeft, isFirstFixedRight, showShadow };
  }, [isFixedLeft, isFixedRight, colIndex, columns, scrollInfo]);

  return (
    <CellComponent
      ref={cellRef}
      key={column.field}
      style={{
        width: column.width,
        left: isFixedLeft ? `${offset}px` : undefined,
        right: isFixedRight ? `${offset}px` : undefined,
      }}
      className={`
        yh-table-cell
        ${isHeader ? "yh-table-head-cell" : ""}
        ${isFixedLeft ? "sticky" : ""} 
        ${isFixedRight ? "sticky" : ""} 
        ${isFixedLeft || isFixedRight ? "z-10" : ""}
        ${isLastFixedLeft ? "fixed-left-last" : ""}
        ${isFirstFixedRight ? "fixed-right-first" : ""}
        ${showShadow ? "show-shadow" : ""}
        col-${colIndex}
      `}
      onClick={onClick} // 處理表頭點擊事件
    >
      {isHeader ? (
        <>
          {column.title}
          {column.sortable && (
            <span
              className={`sort-icon ${tableState.sorter?.field === column.field ? "active" : ""}`}
            >
              <img
                src={
                  tableState.sorter?.sortOrder === SortOrderEnum.ASCEND
                    ? ArrowDropUpIcon
                    : ArrowDropDownIcon
                }
                alt={
                  tableState.sorter?.sortOrder === SortOrderEnum.ASCEND
                    ? "升序"
                    : "降序"
                }
                className="inline-block ml-1 w-4 h-4"
              />
            </span>
          )}
        </>
      ) : column.render ? (
        column.render(row[column.field], row)
      ) : (
        row[column.field]
      )}
    </CellComponent>
  );
};

export default TableCell;
