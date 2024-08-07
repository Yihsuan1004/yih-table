import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Column, SortOrder, TableProps } from './interface';
import Table from './Table';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 28, action: 'edit' },
  { id: 2, name: 'Jane Smith', age: 34, action: 'delete' },
  { id: 3, name: 'Michael Brown', age: 45, action: 'edit' },
];

// Column configuration
const columns: Column[] = [
  { key: 'id', title: 'ID', sortable: true, fixed: 'left' },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  {
    key: 'action',
    title: 'Action',
    fixed: 'right',
    render: (data: any, row: any) => (
      <button onClick={() => alert(`You clicked ${data} for ${row.name}`)}>{data}</button>
    ),
  },
];

// Column configuration
const customColumns: Column[] = [
  { key: 'id', title: 'ID', sortable: true, fixed: 'left', customSort: (a, b) => a.name.localeCompare(b.name) },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  {
    key: 'action',
    title: 'Action',
    fixed: 'right',
    render: (data: any, row: any) => (
      <button onClick={() => alert(`You clicked ${data} for ${row.name}`)}>{data}</button>
    ),
  },
];


// Mock API function to simulate sorting
const mockFetchData = async (sortKey: string, sortOrder: SortOrder) => {
  console.log(`Fetching data sorted by ${sortKey} in ${sortOrder} order`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const sortedData = [...sampleData].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a];
    const bValue = b[sortKey as keyof typeof b];
    if (aValue < bValue) {
      return sortOrder === 'ascend' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'ascend' ? 1 : -1;
    }
    return 0;
  });

  return sortedData;
};

const meta: Meta<TableProps> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TableProps>;

export const DefaultSort: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const BackendSort: Story = {
  args: {
    data: sampleData,
    columns,  
    fetchData: mockFetchData, 
  },
};

export const CustomSort: Story = {
  args: {
    data: sampleData,
    columns:customColumns,  
  },
};