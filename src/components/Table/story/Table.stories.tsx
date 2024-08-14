import { Meta, StoryObj } from "@storybook/react";

import Table from "../Table";
import { TableProps } from "../interface";
import { backendColumns, columns, customColumns, ecommerceColumns, ecommerceData, handleScrollFetch, handleTableStateChange, sampleData, virtualSampleData, virtualSampleData2, virtualScrollColumns } from "./mock-data";



const meta: Meta<TableProps> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    data: {
      description: "表格資料",
    },
    columns: {
      description: "表格欄位設定",
    },
    virtualScroll: {
      description: "是否啟用虛擬滾動",
    },
    className: {
      description: "表格樣式",
    },
    headClassName:{
      description: "表格標題樣式",
    },
    bodyClassName:{
      description: "表格內容樣式",
    },
    onChange: {
      description: "表格資料改變時的callback函數",
    },
    onScrollFetch: {
      description: "虛擬滾動時的callback函數",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    className: "w-[800px] h-[300px]",
  },
  tags: ["autodocs"],
};


export default meta;

type Story = StoryObj<TableProps>;

export const BasicTable: Story = {
  args: {
    data: sampleData,
    columns,
    className: "w-[800px] h-[300px]",
  },
};

export const DefaultSort: Story = {
  args: {
    data: sampleData,
    columns,
    className: "w-[800px] h-[300px]",
  },
};


export const BackendSort: Story = {
  args: {
    data: sampleData,
    columns: backendColumns,
    onChange: handleTableStateChange,
    className: "w-[800px] h-[300px]",
  },
};

export const CustomSort: Story = {
  args: {
    data: sampleData,
    columns: customColumns,
    className: "w-[800px] h-[300px]",
  },
};


export const FixedColumns: Story = {
  args: {
    data: ecommerceData,
    columns: ecommerceColumns,
    virtualScroll: true,
    className: "w-[800px] h-[300px]",
  },
};


export const VirtualScroll: Story = {
  args: {
    data: virtualSampleData,
    columns: virtualScrollColumns,
    virtualScroll: true,
    className: "w-[800px] h-[300px]",
  },
};


export const InfiniteScroll: Story = {
  args: {
    data: virtualSampleData2,
    columns: virtualScrollColumns,
    virtualScroll: true,
    onScrollFetch: handleScrollFetch,
    className: "w-[800px] h-[300px]",
  },
};


