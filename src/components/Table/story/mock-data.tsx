import {
  generateEcommerceData,
  generateRandomNameData,
} from "../../../util/functions";
import { SortOrderEnum } from "../enum";
import {
  ScrollFetchDataResult,
  SortOrder,
  TableColumn,
  TableState,
} from "../interface";



const renderStatus = (status: string) => (
  <span
    className={`px-2 py-1 rounded-full text-xs ${
      status === "上架" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}
  >
    {status}
  </span>
);

const renderImage = (image: string, row: any) => (
  <img
    src={image}
    alt={row.name}
    className="w-20 h-20 object-cover rounded-md"
  />
);

const renderAction = (data: any, row: any) => (
  <button
    className="bg-blue-500 text-white px-2 py-1 rounded-md"
    onClick={() => alert(`你點擊了${row.name}欄位的動作${data}`)}
  >
    {data}
  </button>
);


// Sample data
export const sampleData = [
  {
    id: "PRD001",
    name: "智能手機 X1",
    stock: 150,
    status: "上架",
    action: "編輯",
    image: "./prod-images/手機.jfif",
  },
  {
    id: "PRD002",
    name: "筆記本電腦 Pro",
    stock: 75,
    status: "上架",
    action: "編輯",
    image: "./prod-images/筆記本電腦.jpg",
  },
  {
    id: "PRD003",
    name: "無線耳機 AirPods",
    stock: 200,
    status: "上架",
    action: "編輯",
    image: "./prod-images/無線耳機.jfif",
  },
  {
    id: "PRD004",
    name: "4K 超高清電視",
    stock: 30,
    status: "下架",
    action: "編輯",
    image: "./prod-images/4K電視.jpg",
  },
  {
    id: "PRD005",
    name: "智能手錶 Series 5",
    stock: 100,
    status: "上架",
    action: "編輯",
    image: "./prod-images/智能手錶.jfif",
  },
  {
    id: "PRD006",
    name: "遊戲主機 NextGen",
    stock: 50,
    status: "上架",
    action: "編輯",
    image: "./prod-images/遊戲主機.jpg",
  },
  {
    id: "PRD007",
    name: "數位相機 D3500",
    stock: 25,
    status: "下架",
    action: "編輯",
    image: "./prod-images/數位相機.jpg",
  },
  {
    id: "PRD008",
    name: "藍牙音箱 SoundMax",
    stock: 80,
    status: "上架",
    action: "編輯",
    image: "./prod-images/藍牙音箱.jfif",
  },
  {
    id: "PRD009",
    name: "平板電腦 Tab A",
    stock: 60,
    status: "上架",
    action: "編輯",
    image: "./prod-images/平板電腦.jfif",
  },
  {
    id: "PRD010",
    name: "智能燈泡",
    stock: 40,
    status: "下架",
    action: "編輯",
    image: "./prod-images/智能燈泡.jpg",
  },
];

// Column configuration
export const columns: TableColumn[] = [
  { field: "id", title: "商品ID", sortable: true },
  { field: "name", title: "商品名稱", sortable: true },
  {
    field: "image",
    title: "商品圖片",
    width: 150,
    render: (image: string, row: any) => (
      <img
        src={image}
        alt={row.name}
        className="w-20 h-20 object-cover rounded-md"
      />
    ),
  },
  { field: "stock", title: "庫存", sortable: true },
  {
    field: "status",
    title: "狀態",
    width: 100,
    render: (status: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          status === "上架"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    field: "action",
    title: "操作",
    fixed: "right",
    render: (data: any, row: any) => (
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md"
        onClick={() => alert(`You clicked ${data} for ${row.name}`)}
      >
        {data}
      </button>
    ),
  },
];

export const sortByNameLength = (
  a: any,
  b: any,
  sortOrder: SortOrder
): number => {
  const lengthA = a.name.length;
  const lengthB = b.name.length;
  return sortOrder === SortOrderEnum.ASCEND
    ? lengthA - lengthB
    : lengthB - lengthA;
};

export const backendColumns: TableColumn[] = [
  { field: "id", title: "商品ID" },
  {
    field: "name",
    title: "商品名稱",
    sortable: true,
    customSort:true
  },
  {
    field: "image",
    title: "商品圖片",
    width: 150,
    render: renderImage
  },
  { field: "stock", title: "庫存" },
  {
    field: "status",
    title: "狀態",
    width: 100,
    render: renderStatus
  },
  {
    field: "action",
    title: "操作",
    fixed: "right",
    render: renderAction
  },
];


export const customColumns: TableColumn[] = [
  { field: "id", title: "商品ID" },
  {
    field: "name",
    title: "商品名稱",
    sortable: true,
    customSort: sortByNameLength,
  },
  {
    field: "image",
    title: "商品圖片",
    width: 150,
    render: renderImage
  },
  { field: "stock", title: "庫存" },
  {
    field: "status",
    title: "狀態",
    width: 100,
    render: renderStatus
  },
  {
    field: "action",
    title: "操作",
    fixed: "right",
    render: renderAction
  },
];


/** 
 * 模擬回傳Table State給後端 
 * @param state TableState
*/
export const handleTableStateChange = (state: TableState) => {
  alert(`將Table State內的sorter回傳給後端: ${JSON.stringify(state.sorter)}`);
};

export const ecommerceColumns: TableColumn[] = [
  { field: "orderId", title: "訂單編號", width: 120, fixed: "left" },
  { field: "orderDate", title: "下單日期", width: 110, fixed: "left" },
  { field: "customerName", title: "客戶姓名", width: 150 },
  { field: "totalAmount", title: "訂單金額", width: 100 },
  { field: "status", title: "訂單狀態", width: 100 },
  { field: "paymentMethod", title: "付款方式", width: 120 },
  { field: "shippingMethod", title: "配送方式", width: 120 },
  { field: "trackingNumber", title: "追蹤號碼", width: 130 },
  { field: "productName", title: "商品名稱", width: 200 },
  { field: "sku", title: "SKU", width: 100 },
  { field: "quantity", title: "數量", width: 80 },
  { field: "unitPrice", title: "單價", width: 90 },
  { field: "discount", title: "折扣", width: 80 },
  { field: "tax", title: "稅額", width: 80 },
  { field: "shippingAddress", title: "收貨地址", width: 250 },
  { field: "phoneNumber", title: "聯絡電話", width: 120 },
  { field: "email", title: "電子郵件", width: 180 },
  { field: "returnStatus", title: "退貨狀態", width: 100 },
  { field: "refundAmount", title: "退款金額", width: 100 },
  { field: "stockLevel", title: "庫存水平", width: 100 },
  { field: "category", title: "商品類別", width: 120 },
  { field: "supplier", title: "供應商", width: 150 },
  { field: "lastUpdated", title: "最後更新", width: 110 },
  { field: "rating", title: "商品評分", width: 90 },
  { field: "reviewCount", title: "評論數", width: 90 },
  { field: "promotionCode", title: "促銷代碼", width: 110 },
  { field: "profitMargin", title: "利潤率", width: 90 },
  { field: "salesChannel", title: "銷售渠道", width: 120 },
  { field: "warehouseLocation", title: "倉庫位置", width: 130, fixed: "right" },
  { field: "customerType", title: "客戶類型", width: 100, fixed: "right" },
];


export const virtualScrollColumns: TableColumn[] = [
  { field: "id", title: "ID" },
  { field: "name", title: "Name" },
  { field: "age", title: "Age" },
];
export const ecommerceData = generateEcommerceData(100);
export const virtualSampleData = generateRandomNameData(1000);
export const virtualSampleData2 = generateRandomNameData(50);


/** 模擬滾動從後端取得資料 */
export const handleScrollFetch = async (
  offset: number,
  limit: number | undefined
): Promise<ScrollFetchDataResult<any>> => {
  console.log(`Fetching more data from offset and limit: ${offset} ${limit}`);

  const newData = [
    { id: "N" + offset + 3, name: `New Data ${offset + 3}`, age: 31 },
    { id: "N" + offset + 4, name: `New Data ${offset + 4}`, age: 32 },
    { id: "N" + offset + 5, name: `New Data ${offset + 5}`, age: 33 },
    { id: "N" + offset + 6, name: `New Data ${offset + 6}`, age: 34 },
  ];

  const nextOffset = offset + newData.length;
  const hasMore = nextOffset < 60; //假設為多只有100筆資料

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: newData,
        nextOffset,
        hasMore,
      });
    }, 1000);
  });
};
