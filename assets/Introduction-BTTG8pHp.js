import{j as n}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as r}from"./index-BrnU7xv7.js";import"./index-DJO9vBfz.js";function c(l){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"table-component-react",children:"Table Component (React)"}),`
`,n.jsx(e.p,{children:"這是一個使用 React、TypeScript 和 Vite 建置的表格元件庫。"}),`
`,n.jsx(e.h2,{id:"特色",children:"特色"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"React 18"})]}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"Storybook"})," 進行元件開發和展示"]}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"TailwindCSS"})," 進行樣式處理"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"TypeScript"})," 支援，"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Vite"})," 作為建置工具，實現快速的開發體驗"]}),`
`]}),`
`,n.jsx(e.h2,{id:"套件功能",children:"套件功能"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#%E6%8E%92%E5%BA%8F-sort",children:"排序 Sort"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#%E8%99%9B%E6%93%AC%E6%BB%BE%E5%8B%95-virtual-scroll",children:"虛擬滾動 Virtual scroll"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#%E7%84%A1%E9%99%90%E6%BB%BE%E5%8B%95-infinite-scroll",children:"無限滾動 Infinite scroll"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#%E5%9B%BA%E5%AE%9A%E6%AC%84%E4%BD%8D-fixed-column",children:"固定欄位 fixed column"})}),`
`]}),`
`,n.jsx(e.h2,{id:"排序-sort",children:"排序 Sort"}),`
`,n.jsxs(e.p,{children:["分成",n.jsx(e.code,{children:"normal sort"}),"、",n.jsx(e.code,{children:"backend sort"}),"、",n.jsx(e.code,{children:"custom sort"})]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"normal sort"})," : 直接在前端進行預設的排序"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"backend sort"}),": 透過後端 API 進行排序"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"custom sort"}),": 自訂排序邏輯，可以根據需求進行排序"]}),`
`]}),`
`,n.jsx(e.h2,{id:"虛擬滾動-virtual-scroll",children:"虛擬滾動 Virtual scroll"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:`用於高效地渲染和顯示大筆表格資料。
當一個表格需要顯示大量的資料時，直接渲染所有行會導致性能問題。
虛擬滾動通過僅渲染當前視口（viewport）中的行，而不是整個資料，來解決這個問題。`}),`
`]}),`
`,n.jsxs(e.p,{children:["使用方式：設定",n.jsx(e.code,{children:"virtualScroll"}),"為",n.jsx(e.code,{children:"true"})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`const App: React.FC = () => <Table virtualScroll />;

export default App;
`})}),`
`,n.jsx(e.h2,{id:"無限滾動-infinite-scroll",children:"無限滾動 Infinite scroll"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:`與虛擬滾動類似，應用於需要顯示大量資料。
差別在透過無限滾動不需要一次性載入所有資料。無限滾動的核心概念是，隨著用戶滾動到頁面底部，系統會自動加載更多內容，而不需要用戶手動觸發加載行為（呼叫後端API）`}),`
`]}),`
`,n.jsx(e.p,{children:"使用方式："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["設定",n.jsx(e.code,{children:"virtualScroll"}),"為",n.jsx(e.code,{children:"true"})]}),`
`,n.jsxs(e.li,{children:["設定",n.jsx(e.code,{children:"onScrollFetch"}),"，傳入自定義方法"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`//自定義方法，透過後端撈取資料
const handleFetchData = async(offset:number):Promise<ScrollFetchDataResult<any>> => { ... }

const App: React.FC = () => <Table virtualScroll onScrollFetch={handleFetchData} />;

export default App;
`})}),`
`,n.jsx(e.h2,{id:"固定欄位-fixed-column",children:"固定欄位 Fixed Column"}),`
`,n.jsx(e.p,{children:"設定欄位是否固定和其固定的方向"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`//設定“訂單編號"欄位固定在左方
const ecommerceColumns: TableColumn[] = [
  { field: "orderId", title: "訂單編號", width: 120, fixed: "left" },
  ....其他資料
]
const App: React.FC = () => <Table columns={ecommerceColumns} />;

export default App;
`})})]})}function d(l={}){const{wrapper:e}={...r(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(c,{...l})}):c(l)}export{d as default};
