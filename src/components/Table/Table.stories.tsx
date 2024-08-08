import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Column, TableProps, TableState } from './interface';
import Table from './Table';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 28, action: 'edit' },
  { id: 2, name: 'Jane Smith', age: 34, action: 'delete' },
  { id: 3, name: 'Michael Brown', age: 45, action: 'edit' },
];

// Column configuration
const columns: Column[] = [
  { field: 'id', title: 'ID', sortable: true, fixed: 'left' },
  { field: 'name', title: 'Name', sortable: true },
  { field: 'age', title: 'Age', sortable: true },
  {
    field: 'action',
    title: 'Action',
    fixed: 'right',
    render: (data: any, row: any) => (
      <button onClick={() => alert(`You clicked ${data} for ${row.name}`)}>{data}</button>
    ),
  },
];

// Column configuration
const customColumns: Column[] = [
  { field: 'id', title: 'ID', sortable: true, fixed: 'left', customSort: true },
  { field: 'name', title: 'Name', sortable: true, customSort: true },
  { field: 'age', title: 'Age', sortable: true, customSort: true },
  {
    field: 'action',
    title: 'Action',
    fixed: 'right',
    render: (data: any, row: any) => (
      <button onClick={() => alert(`You clicked ${data} for ${row.name}`)}>{data}</button>
    ),
  },
];


// Mock API function to simulate sorting
const handleTableStateChange = (state: TableState) => {
  console.log('Table State:', state);
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
  },
};

export const CustomSort: Story = {
  args: {
    data: sampleData,
    columns:customColumns,  
    onChange: handleTableStateChange,
  },
};