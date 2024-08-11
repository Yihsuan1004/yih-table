import React from 'react';
import { TableRowProps } from './interface';

export const TableRow: React.FC<TableRowProps> = ({ index, className, row, columns }) => {
  return (
    <tr className={className} key={index}>
      {columns.map((column) => (
        <td key={column.field} className="yh-table-cell">
          {column.render ? column.render(row[column.field], row) : row[column.field]}
        </td>
      ))}
    </tr>
  );
};

export const VirtualTableRow: React.FC<TableRowProps> = ({ virtualRow,index,className, row, columns }) => {
    return (
      <tr className={className} key={row.id} style={{
        height: `${virtualRow?.size}px`,
        transform: `translateY(${
        virtualRow!.start - index * virtualRow!.size
        }px)`
      }}>
        {columns.map((column) => (
          <td key={column.field} className="yh-table-cell">
            {column.render ? column.render(row[column.field], row) : row[column.field]}
          </td>
        ))}
      </tr>
    );
  };