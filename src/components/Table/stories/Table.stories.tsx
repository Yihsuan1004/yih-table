import { Meta, StoryObj } from "@storybook/react";

import Table from "../Table";
import { TableProps } from "../interface";
import {
  backendColumns,
  columns,
  customColumns,
  ecommerceColumns,
  ecommerceData,
  handleScrollFetch,
  handleTableStateChange,
  sampleData,
  virtualSampleData,
  virtualSampleData2,
  virtualScrollColumns,
} from "./mock-data";

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
      table: {
        type: {
          summary: "Column[]",
          detail: `[{
            field: string; // 欄位名稱
            title: string; // 欄位標題
            width?: number | string; //欄位寬度
            fixed?: FixedDirection; //欄固定方向（left/right)
            sortable?: boolean; // 是否可排序
            sortIcon?: React.ReactNode; // 自訂排序圖標
            customSort?: ((a: any, b: any, sortOrder: SortOrder) => number) | boolean ///自定義排序函數，若設置為true則代表使用後端排序，會透過onChange回傳sortConfig給父元件; 
            render?: (data: any, row: TableRow) => React.ReactNode; // 自定義渲染函數 }]`,
        },
      },
    },
    virtualScroll: {
      description: "是否啟用虛擬滾動",
    },
    className: {
      description: "表格樣式",
    },
    headClassName: {
      description: "表格標題樣式",
    },
    bodyClassName: {
      description: "表格內容樣式",
    },
    onChange: {
      description: "表格資料改變時的callback函數",
      action: "onChange",
      type: { name: "function", required: false },
    },
    onScrollFetch: {
      description: "虛擬滾動時的callback函數;<br>啟用時需要設置virtualScroll為true才能生效",
      action: "onScrollFetch",
      defaultValue: null
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
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
    onScrollFetch: undefined, //reset
    className: "w-[800px] h-[300px]",
  },
};

export const VirtualScroll: Story = {
  args: {
    data: virtualSampleData,
    columns: virtualScrollColumns,
    virtualScroll: true,
    onScrollFetch: undefined, //reset
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
