import { Meta, StoryObj } from '@storybook/react';
import { TableColumn, SortOrder, TableProps, TableState, ScrollFetchDataResult } from './interface';
import Table from './Table';
import { SortOrderEnum } from './enum';
import { generateEcommerceData, generateRandomNameData } from '../../util/functions';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe Brown', age: 28, action: 'edit' },
  { id: 2, name: 'Jane Smith', age: 34, action: 'delete' },
  { id: 3, name: 'Michael Brown', age: 45, action: 'edit' },
  { id: 4, name: 'Augustine Williams', age: 18, action: 'edit' },
];


const virtualSampleData = generateRandomNameData(1000);
const virtualSampleData2 = generateRandomNameData(50);

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
  { field: 'id', title: 'ID', sortable: true, customSort: true },
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
  { field: 'id', title: 'ID', sortable: true,},
  { field: 'name', title: 'Name', sortable: true, customSort: sortByNameLength },
  { field: 'age', title: 'Age', sortable: true},
  {
    field: 'action',
    title: 'Action',
    render: (data: any, row: any) => (
      <button onClick={() => alert(`You clicked ${data} for ${row.name}`)}>{data}</button>
    ),
  },
];


const ecommerceColumns: TableColumn[] = [
  { field: 'orderId', title: '訂單編號', width: 120,fixed: 'left' },
  { field: 'orderDate', title: '下單日期', width: 110,fixed: 'left'  },
  { field: 'customerName', title: '客戶姓名', width: 150 },
  { field: 'totalAmount', title: '訂單金額', width: 100 },
  { field: 'status', title: '訂單狀態', width: 100 },
  { field: 'paymentMethod', title: '付款方式', width: 120 },
  { field: 'shippingMethod', title: '配送方式', width: 120 },
  { field: 'trackingNumber', title: '追蹤號碼', width: 130 },
  { field: 'productName', title: '商品名稱', width: 200 },
  { field: 'sku', title: 'SKU', width: 100 },
  { field: 'quantity', title: '數量', width: 80 },
  { field: 'unitPrice', title: '單價', width: 90 },
  { field: 'discount', title: '折扣', width: 80 },
  { field: 'tax', title: '稅額', width: 80 },
  { field: 'shippingAddress', title: '收貨地址', width: 250 },
  { field: 'phoneNumber', title: '聯絡電話', width: 120 },
  { field: 'email', title: '電子郵件', width: 180 },
  { field: 'returnStatus', title: '退貨狀態', width: 100 },
  { field: 'refundAmount', title: '退款金額', width: 100 },
  { field: 'stockLevel', title: '庫存水平', width: 100 },
  { field: 'category', title: '商品類別', width: 120 },
  { field: 'supplier', title: '供應商', width: 150 },
  { field: 'lastUpdated', title: '最後更新', width: 110 },
  { field: 'rating', title: '商品評分', width: 90 },
  { field: 'reviewCount', title: '評論數', width: 90 },
  { field: 'promotionCode', title: '促銷代碼', width: 110 },
  { field: 'profitMargin', title: '利潤率', width: 90 },
  { field: 'salesChannel', title: '銷售渠道', width: 120 },
  { field: 'warehouseLocation', title: '倉庫位置', width: 130,fixed: 'right' },
  { field: 'customerType', title: '客戶類型', width: 100,fixed: 'right' }
];

const ecommerceData = generateEcommerceData(100);




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


const handleScrollFetch = async (offset: number, limit: number | undefined) : Promise<ScrollFetchDataResult<any>> => {
  console.log(`Fetching more data from offset and limit: ${offset} ${limit}`);

  const newData = [
    { id: 'N'+ offset + 3, name: `New Data ${offset + 3}`, age: 31 },
    { id: 'N'+ offset + 4, name: `New Data ${offset + 4}`, age: 32 },
    { id: 'N'+ offset + 5, name: `New Data ${offset + 5}`, age: 33 },
    { id: 'N'+ offset + 6, name: `New Data ${offset + 6}`, age: 34 },

  ];
  
  const nextOffset = offset + newData.length;
  const hasMore = nextOffset < 60; //假設為多只有100筆資料

  return new Promise((resolve) => {
    setTimeout(() => {
       resolve(
        { 
          data: newData,
          nextOffset,
          hasMore,
        });
    }, 1000);
  });
};

export const InfiniteScroll: Story = {
  args: {
    data: virtualSampleData2,
    columns: virtualScrollColumns, 
    virtualScroll: true,
    onScrollFetch: handleScrollFetch
  },
};


export const FixedColumns: Story = {
  args: {
    data: ecommerceData,
    columns: ecommerceColumns, 
    virtualScroll: true,
    className: 'w-[800px]',
  },
};