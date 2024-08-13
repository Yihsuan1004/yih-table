import React, { useRef, useEffect, useState } from 'react';
import { TableColumn } from './interface';
import { SortOrderEnum } from './enum';


interface Props {
  column: TableColumn;
  colIndex: number;
  columns: TableColumn[];
  isFixedLeft: boolean;
  isFixedRight: boolean;
  row?: any;
  isHeader?: boolean; // 判斷是不是表頭
  tableState?: any;
  onClick?: () => void;
}

const TableCell: React.FC<Props> = ({ 
    column, row, colIndex, columns, isFixedLeft, isFixedRight,isHeader,onClick,tableState}) => {
    const cellRef = useRef<HTMLTableCellElement | HTMLTableHeaderCellElement>(null);
    const [leftOffset, setLeftOffset] = useState(0);
  const [rightOffset, setRightOffset] = useState(0);

  useEffect(() => {
    if (isFixedLeft || isFixedRight) {
      let offset = 0;

      if (isFixedLeft) {
        for (let i = 0; i < colIndex; i++) {
          const element = document.querySelector<HTMLTableCellElement>(`.col-${i}`);
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setLeftOffset(offset);
      }

      if (isFixedRight) {
        offset = 0;
        for (let i = columns.length - 1; i > colIndex; i--) {
          const element = document.querySelector<HTMLTableCellElement>(`.col-${i}`);
          if (element) {
            offset += element.offsetWidth;
          }
        }
        setRightOffset(offset);
      }
    }
  }, [colIndex, columns, isFixedLeft, isFixedRight]);


  const CellComponent = isHeader ? 'th' : 'td'; // 決定使用 th 或 td

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
        ${isFixedLeft ? 'sticky' : ''} 
        ${isFixedRight ? 'sticky' : ''} 
        ${isFixedLeft || isFixedRight ? 'z-10 bg-white' : ''}
        col-${colIndex}
      `}
      onClick={onClick} // 處理表頭點擊事件
    >
      {isHeader
        ? column.title + (tableState.sorter?.field === column.field ? (tableState.sorter.sortOrder === SortOrderEnum.ASCEND ? "↑" : "↓") : "")
        : column.render ? column.render(row[column.field], row) : row[column.field]}
    </CellComponent>
  );
};

export default TableCell;
