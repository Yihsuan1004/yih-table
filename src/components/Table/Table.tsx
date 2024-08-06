
import React, { useEffect, useState } from 'react';
import { SortOrder, TableProps } from './interface';
import { SortOrderEnum } from './enum';



const Table: React.FC<TableProps> = ({ columns, fetchData, data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortOrder} | null>(null);
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>(data);

  // Function to handle sorting
  const handleSort = async (key: string) => {
    let direction: SortOrder = SortOrderEnum.ASCEND;
    if (sortConfig && sortConfig.key === key && sortConfig.direction === SortOrderEnum.ASCEND) {
      direction = SortOrderEnum.DESCEND;
    }

    setSortConfig({ key, direction });

    // Fetch sorted data from the backend
    try {
      const sortedData = await fetchData(key, direction);
      setTableData(sortedData);
    } catch (error) {
      console.error('Error fetching sorted data:', error);
    }
  };

  // Use effect to set initial data
  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              onClick={() => column.sortable && handleSort(column.key)}
              style={{ position: column.fixed ? 'sticky' : 'static', [column.fixed || '']: 0 }}
            >
              {column.title} {sortConfig?.key === column.key ? (sortConfig.direction === SortOrderEnum.ASCEND ? '↑' : '↓') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

