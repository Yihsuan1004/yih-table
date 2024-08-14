import React, { useRef, useEffect, useState } from "react";
import { TableColumn } from "./interface";
import { SortOrderEnum } from "./enum";
import ArrowDropUpIcon from "../../assets/arrow_drop_up.svg";
import ArrowDropDownIcon from "../../assets/arrow_drop_down.svg";

interface TableCellProps {
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
  const [leftOffset, setLeftOffset] = useState(0);
  const [rightOffset, setRightOffset] = useState(0);

  useEffect(() => {
    if (isFixedLeft || isFixedRight) {
      let offset = 0;

      if (isFixedLeft) {
        for (let i = 0; i < colIndex; i++) {
          const element = document.querySelector<HTMLTableCellElement>(
            `.col-${i}`
          );
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setLeftOffset(offset);
      }

      if (isFixedRight) {
        offset = 0;
        for (let i = columns.length - 1; i > colIndex; i--) {
          const element = document.querySelector<HTMLTableCellElement>(
            `.col-${i}`
          );
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setRightOffset(offset);
      }
    }
  }, [colIndex, columns, isFixedLeft, isFixedRight]);

  const CellComponent = isHeader ? "th" : "td"; // 決定使用 th 或 td
  // 判斷是否為左側固定列的最後一列
  const isLastFixedLeft =
    isFixedLeft &&
    colIndex === columns.filter((col) => col.fixed === "left").length - 1;
  // 判斷是否為右側固定列的第一列
  const isFirstFixedRight =
    isFixedRight &&
    colIndex ===
      columns.length - columns.filter((col) => col.fixed === "right").length;
  const showLeftShadow = (isLastFixedLeft && scrollInfo?.left) || 0 > 0;
  const showRightShadow = (isFirstFixedRight && scrollInfo?.right) || 0 > 0;

  return (
    <CellComponent
      ref={cellRef}
      key={column.field}
      style={{
        width: column.width,
        left: isFixedLeft ? `${leftOffset}px` : undefined,
        right: isFixedRight ? `${rightOffset}px` : undefined,
      }}
      className={`
        yh-table-cell
        ${isHeader ? "yh-table-head" : ""}
        ${isFixedLeft ? "sticky" : ""} 
        ${isFixedRight ? "sticky" : ""} 
        ${isFixedLeft || isFixedRight ? "z-10" : ""}
        ${isLastFixedLeft ? "fixed-left-last" : ""}
        ${isFirstFixedRight ? "fixed-right-first" : ""}
        ${(showLeftShadow || showRightShadow) && scrollInfo ? "show-shadow" : ""}
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
