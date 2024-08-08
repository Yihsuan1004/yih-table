
import React, { useEffect, useState } from 'react';
import { TableProps, TableState } from './interface';
import { SortOrderEnum } from './enum';
import { RecordType } from "../../util/type";
import useSort from './hooks/useSort';



const Table: React.FC<TableProps> = ({ columns, onChange, data }) => {
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>(data);
  const [tableState, setTableState] = useState<TableState>({
    sorter: { field: '', sortOrder: SortOrderEnum.DESCEND },
    currentData: [] as RecordType[]
  });

  const { data: sortedData, onSort, sortConfig } = useSort(data, tableState.sorter);

  const handleTableChange = (newTableState: TableState) => {
    setTableData(newTableState.currentData || []);
    setTableState(newTableState);
    onChange?.(newTableState);
  };

  const handleSort = (field: string, customSort?: ((a: any, b: any) => number) | boolean) => {
    const { data, sortConfig } = onSort(field, customSort);
    // 更新表格狀態
    handleTableChange({
      sorter: sortConfig,
      currentData: data
    });
  };

  useEffect(() => {
    setTableData(sortedData || []);
  }, [sortedData]);

  useEffect(() => {
    setTableState(prevState => ({
      ...prevState,
      sorter: sortConfig
    }));
  }, [sortConfig]);

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.field}
              onClick={() => column.sortable && handleSort(column.field,column.customSort)}
              style={{ position: column.fixed ? 'sticky' : 'static', [column.fixed || '']: 0 }}
            >
              {column.title} {tableState.sorter?.field === column.field ? (tableState.sorter.sortOrder === SortOrderEnum.ASCEND ? '↑' : '↓') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.field}>
                {column.render ? column.render(row[column.field], row) : row[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

