const dbOrderDetails = [
    {
      orderId: 1,
      items: [
        { itemId: 101, itemName: "Shirt", quantity: 10 },
        { itemId: 102, itemName: "Pants", quantity: 5 }
      ]
    },
    {
      orderId: 2,
      items: [
        { itemId: 103, itemName: "Shoes", quantity: 2 }
      ]
    }
  ];
  
  
  const userOrderDetails = [
    {
      orderId: 1,
      items: [
        { itemId: 101, itemName: "Shirt", quantity: 15 }, 
        { itemId: 102, itemName: "Pants", quantity: 5 }
      ]
    },
    {
      orderId: 2,
      items: [
        { itemId: 103, itemName: "Shoes", quantity: 3 }, 
        { itemId: 104, itemName: "Hat", quantity: 1 } 
      ]
    }
  ];
  
  function compareAndUpdate(dbArray, userArray) {
    const changes = [];
  
    userArray.forEach(userOrder => {
      const dbOrder = dbArray.find(dbOrder => dbOrder.orderId === userOrder.orderId);
      
      if (dbOrder) {
        userOrder.items.forEach(userItem => {
          const dbItem = dbOrder.items.find(dbItem => dbItem.itemId === userItem.itemId);
  
          if (dbItem) {
            if (dbItem.quantity !== userItem.quantity) {
              changes.push({
                type: "update",
                orderId: userOrder.orderId,
                itemId: userItem.itemId,
                oldQuantity: dbItem.quantity,
                newQuantity: userItem.quantity
              });
            }
          } else {
            changes.push({
              type: "newItem",
              orderId: userOrder.orderId,
              item: userItem
            });
          }
        });

        dbOrder.items.forEach(dbItem => {
          const userItem = userOrder.items.find(userItem => userItem.itemId === dbItem.itemId);
          if (!userItem) {
            changes.push({
              type: "removedItem",
              orderId: userOrder.orderId,
              itemId: dbItem.itemId
            });
          }
        });
      } else {
        changes.push({
          type: "newOrder",
          order: userOrder
        });
      }
    });
  
    return changes;
  }
  
  const detectedChanges = compareAndUpdate(dbOrderDetails, userOrderDetails);
  console.log(detectedChanges);
  
  
  

function orederFullFillabeOrNot(bomMaterials, warehouseStock) {
  let stockMap = {};


  warehouseStock.forEach(stock => {
    stockMap[stock.materialId] = stock.availableQuantity;
  });

  let required = [];

  
  bomMaterials.forEach(bomMaterial => {
    let requiredQuantity = bomMaterial.requiredQuantity;
    let availableQuantity = stockMap[bomMaterial.materialId] || 0; 

    
    if (requiredQuantity > availableQuantity) {
      let requiredStock = requiredQuantity - availableQuantity;
      required.push({
        materialId: bomMaterial.materialId,
        requiredQuantity: requiredStock
      });
    }
  });

 
  if (required.length === 0) {
    return { orderFullFilled: true };
  } else {
    return { 
      orderFullFilled: false,
      required
    };
  }
}


let bomMaterials = [
  { materialId: 1, requiredQuantity: 100 },
  { materialId: 2, requiredQuantity: 50 },
  { materialId: 3, requiredQuantity: 200 }
];

let warehouseStock = [
  { materialId: 1, availableQuantity: 80 },
  { materialId: 2, availableQuantity: 60 },
  { materialId: 3, availableQuantity: 150 }
];

console.log(orederFullFillabeOrNot(bomMaterials, warehouseStock));



let currentStock = [
  { itemId: 1, quantity: 50 },
  { itemId: 2, quantity: 200 },
  { itemId: 3, quantity: 30 }
];

let requiredStock = [
  { itemId: 1, minQuantity: 100 },
  { itemId: 2, minQuantity: 150 },
  { itemId: 3, minQuantity: 50 }
];

function restockNeeded(currentStock, requiredStock) {
  let result = []; 
  currentStock.forEach(stock => {
    let reStock = requiredStock.find(reStock => reStock.itemId === stock.itemId); 
    if (stock.quantity < reStock.minQuantity) {
      result.push({
        itemId: stock.itemId,
        requiredQuantity: reStock.minQuantity - stock.quantity 
      });
    }
  });
  return result;
}

console.log(restockNeeded(currentStock, requiredStock));


let order = [
  { itemId: 1, quantity: 500 },
  { itemId: 2, quantity: 150 }
];

let warehouses = [
  { warehouseId: 1, stock: [{ itemId: 1, quantity: 100 }, { itemId: 2, quantity: 50 }] },
  { warehouseId: 2, stock: [{ itemId: 1, quantity: 200 }, { itemId: 2, quantity: 100 }] }
];

function allocateOrder(order, warehouses) {
  let allocation = [];
  let orderFulfilled = true;

  order.forEach(ord => {
    let requiredQuantity = ord.quantity;

    for (let i = 0; i < warehouses.length; i++) {
      let wh = warehouses[i];
      let availableStock = wh.stock.find(st => st.itemId === ord.itemId);

      if (availableStock) {
        let allocatedStock = Math.min(availableStock.quantity, requiredQuantity);
        requiredQuantity -= allocatedStock;

        allocation.push({
          warehouseId: wh.warehouseId,
          allocatedStock: allocatedStock,
          itemId: ord.itemId
        });

        if (requiredQuantity === 0) break;
      }
    }
    
    if (requiredQuantity > 0) {
      orderFulfilled = false; 
    }
  });

  return { orderFulfilled, allocation };
}

console.log(allocateOrder(order, warehouses));
