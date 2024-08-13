export const generateRandomNameData = (numRecords: number) => {
    const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Alice Johnson', 'Chris Lee', 'Emma Wilson'];
    const data = [];
  
    for (let i = 1; i <= numRecords; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAge = Math.floor(Math.random() * 60) + 18; // Random age between 18 and 77
  
      data.push({
        id: '#'+ i,
        name: `${randomName} ${i}`, 
        age: randomAge,
      });
    }
  
    return data;
  }
  

  export const generateEcommerceData = (count: number) => {
    const data = [];
    const statuses = ['待付款', '已付款', '配送中', '已完成', '已取消', '退貨中'];
    const paymentMethods = ['信用卡', 'PayPal', '銀行轉帳', '貨到付款'];
    const shippingMethods = ['標準配送', '快速配送', '超商取貨', '國際運送'];
    const categories = ['電子產品', '服飾', '家居用品', '食品', '書籍', '運動用品'];
    const suppliers = ['供應商A', '供應商B', '供應商C', '供應商D', '供應商E'];
    const salesChannels = ['官網', '實體店面', '第三方平台', '社交媒體'];
    const warehouses = ['北部倉庫', '中部倉庫', '南部倉庫', '東部倉庫'];
    const customerTypes = ['新客戶', '回頭客', 'VIP客戶', '企業客戶'];
  
    for (let i = 0; i < count; i++) {
      const orderDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
      const quantity = Math.floor(Math.random() * 10) + 1;
      const unitPrice = Math.floor(Math.random() * 1000) + 100;
      const totalAmount = quantity * unitPrice;
      
      data.push({
        orderId: `ORD${String(i + 1).padStart(6, '0')}`,
        orderDate: orderDate.toISOString().split('T')[0],
        customerName: `客戶${i + 1}`,
        totalAmount: totalAmount,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        shippingMethod: shippingMethods[Math.floor(Math.random() * shippingMethods.length)],
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        productName: `商品${i + 1}`,
        sku: `SKU${String(i + 1).padStart(6, '0')}`,
        quantity: quantity,
        unitPrice: unitPrice,
        discount: Math.floor(Math.random() * 20),
        tax: Math.floor(totalAmount * 0.05),
        shippingAddress: `地址${i + 1}`,
        phoneNumber: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        email: `customer${i + 1}@example.com`,
        returnStatus: Math.random() > 0.9 ? '已退貨' : '未退貨',
        refundAmount: Math.random() > 0.9 ? Math.floor(totalAmount * Math.random()) : 0,
        stockLevel: Math.floor(Math.random() * 100),
        category: categories[Math.floor(Math.random() * categories.length)],
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        lastUpdated: new Date().toISOString().split('T')[0],
        rating: (Math.random() * 5).toFixed(1),
        reviewCount: Math.floor(Math.random() * 100),
        promotionCode: Math.random() > 0.7 ? `PROMO${Math.random().toString(36).substr(2, 6).toUpperCase()}` : '',
        profitMargin: (Math.random() * 0.5).toFixed(2),
        salesChannel: salesChannels[Math.floor(Math.random() * salesChannels.length)],
        warehouseLocation: warehouses[Math.floor(Math.random() * warehouses.length)],
        customerType: customerTypes[Math.floor(Math.random() * customerTypes.length)]
      });
    }
  
    return data;
  }
