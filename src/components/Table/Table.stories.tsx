import { Meta, StoryObj } from '@storybook/react';
import { TableColumn, SortOrder, TableProps, TableState } from './interface';
import Table from './Table';
import { SortOrderEnum } from './enum';
import { generateRandomNameData } from '../../util/functions';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe Brown', age: 28, action: 'edit' },
  { id: 2, name: 'Jane Smith', age: 34, action: 'delete' },
  { id: 3, name: 'Michael Brown', age: 45, action: 'edit' },
  { id: 4, name: 'Augustine Williams', age: 18, action: 'edit' },
];


const virtualSampleData = generateRandomNameData(1000);

// Column configuration
const columns: TableColumn[] = [
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

const virtualScrollColumns: TableColumn[] = [
  { field: 'id', title: 'ID'},
  { field: 'name', title: 'Name'},
  { field: 'age', title: 'Age' },
];

// Column configuration
const backendColumns: TableColumn[] = [
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


const sortByNameLength =(a: any, b: any, sortOrder: SortOrder): number => {
    const lengthA = a.name.length;
    const lengthB = b.name.length;
    return sortOrder === SortOrderEnum.ASCEND ? lengthA - lengthB : lengthB - lengthA;
}

const customColumns: TableColumn[] = [
  { field: 'id', title: 'ID', sortable: true, fixed: 'left',},
  { field: 'name', title: 'Name', sortable: true, customSort: sortByNameLength },
  { field: 'age', title: 'Age', sortable: true},
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
    columns:backendColumns,  
    onChange: handleTableStateChange,
  },
};



export const CustomSort: Story = {
  args: {
    data: sampleData,
    columns: customColumns,  
  },
};


export const VirtualScroll: Story = {
  args: {
    data: virtualSampleData,
    columns: virtualScrollColumns, 
    virtualScroll: true,
  },
};