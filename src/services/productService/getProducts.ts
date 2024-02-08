import axios from "axios";
import logger from "../../utils/logger";

export type Product = {
  productId: string;
  storeId: string;
  price: {
    price: string;
  },
  currentDiscount: string | null,
  store: {
    deliveryPrice: string | null;
  }
}

type ProductResponse = {
  data: {
    data: Product,
  }
}

const getProducts = async (productId: string): Promise<Product | null> => {
  try {
    const path = `${process.env.GATEWAY}/product-service/product/${productId}/new?lang=ru`;
    const Authorization = "Bearer " + process.env.SERVICE_TOKEN;
    const product: ProductResponse = await axios.get(path, { headers: { Authorization } });
    if (product.data.data.productId) {
        return product.data.data;
    }
    return null;
  } catch (e: any) {
    logger.error(e.response?.data || `${e}`);
    return null;
  }
}

export default getProducts;

// aliexpress product
// {
//   "message": "no message available",
//   "errors": [],
//   "data": {
//       "product": {
//           "priceToShow": 0,
//           "currentDiscountToShow": 0,
//           "productImage": "https://ae01.alicdn.com/kf/HLB1GIt.bo_rK1Rjy0Fcq6zEvVXac/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg",
//           "productImages": [
//               {
//                   "small": "https://ae01.alicdn.com/kf/HLB1GIt.bo_rK1Rjy0Fcq6zEvVXac/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_100x100.jpg",
//                   "medium": "https://ae01.alicdn.com/kf/HLB1GIt.bo_rK1Rjy0Fcq6zEvVXac/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_300x300.jpg",
//                   "large": "https://ae01.alicdn.com/kf/HLB1GIt.bo_rK1Rjy0Fcq6zEvVXac/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               }
//           ],
//           "id": "ae-2255800402867822",
//           "productId": "2bfbff29-918b-4302-ada6-9d1380a7ad1c",
//           "storeId": "7b3dec77-7ee7-4374-bb90-8fde295a33a2",
//           "statusId": 1,
//           "modelId": null,
//           "available": 5,
//           "priceFixed": true,
//           "minOrder": 1,
//           "sku": "",
//           "rating": 0,
//           "slug": "2pc-portable-mini",
//           "group": null,
//           "brandId": 377,
//           "syncNeeded": false,
//           "createdAt": "2024-02-05T06:24:09.572Z",
//           "updatedAt": "2024-02-05T06:24:09.572Z",
//           "warranty": null,
//           "price": {
//               "price": "84.80"
//           },
//           "currentDiscount": {
//               "value": 0
//           },
//           "detail": {
//               "title": "2 % портативные мини -подлонки для обуви ширины",
//               "description": "2Pc Portable Mini Shoes Stretchers Width Extender Adjustable Shoe Support Hot Sale High Quality 2019 Plastic Shoe Aid Men Women"
//           },
//           "images": [
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1GIt.bo_rK1Rjy0Fcq6zEvVXac/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               },
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1YgyXbfLsK1Rjy0Fbq6xSEXXaY/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               },
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1zBijbozrK1RjSspmq6AOdFXaH/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               },
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1RIN8birxK1RkHFCcq6AQCVXad/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               },
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1yD1ibjvuK1Rjy0Faq6x2aVXam/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               },
//               {
//                   "id": 1707114249573,
//                   "name": "https://ae01.alicdn.com/kf/HLB1tnKrbjnuK1RkSmFPq6AuzFXa3/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_600x600.jpg"
//               }
//           ],
//           "brand": {
//               "name": "AliExpress",
//               "avatar": "1648462683625.webp",
//               "avatarDark": "1648462686816.webp"
//           },
//           "store": {
//               "id": 52,
//               "storeId": "7b3dec77-7ee7-4374-bb90-8fde295a33a2",
//               "name": "AkatExpress",
//               "slug": "akatexpress",
//               "image": "store_1648453113563.webp",
//               "deliveryPrice": "0.00",
//               "freeShippingOver": "0.00",
//               "rating": null,
//               "paymentTypeIds": [
//                   2,
//                   1
//               ],
//               "multiplier": "20.00",
//               "discountInPercent": "0.00"
//           },
//           "hasOption": {
//               "id": 1
//           },
//           "category": {
//               "categoryId": 2379
//           },
//           "categories": [
//               {
//                   "categoryId": 2379
//               }
//           ],
//           "measurement": {
//               "weight": 0.035
//           },
//           "cart": null,
//           "wishlist": null
//       },
//       "options": [
//           {
//               "id": "14",
//               "code": "color",
//               "name": {
//                   "name": "Цвет"
//               },
//               "children": [
//                   {
//                       "id": "10",
//                       "name": {
//                           "name": "Красный"
//                       },
//                       "products": [
//                           {
//                               "productId": "ae-2255800402867822-10",
//                               "available": 1,
//                               "slug": "2pc-portable-mini",
//                               "image": {
//                                   "name": "https://ae01.alicdn.com/kf/HTB1VDyebcrrK1RjSspaq6AREXXad/2Pc-Portable-Mini-Shoes-Stretchers-Width-Extender-Adjustable-Shoe-Support-Hot-Sale-High-Quality-2019-Plastic.jpg_100x100.jpg"
//                               }
//                           }
//                       ]
//                   }
//               ]
//           }
//       ],
//       "shippings": [
//           {
//               "label": "25 дней доставки",
//               "priceKg": "160.00",
//               "shipping": "air",
//               "shippingPrice": "5.60"
//           }
//       ]
//   }
// }

// local product
// {
//   "message": "no message available",
//   "errors": [],
//   "data": {
//       "product": {
//           "priceToShow": 0,
//           "currentDiscountToShow": 0,
//           "productImage": null,
//           "productImages": [
//               {
//                   "small": "https://market.akat.com.tm/api/uploads-service/storage/images/product/small/1659163538066.webp",
//                   "medium": "https://market.akat.com.tm/api/uploads-service/storage/images/product/medium/1659163538066.webp",
//                   "large": "https://market.akat.com.tm/api/uploads-service/storage/images/product/large/1659163538066.webp"
//               },
//               {
//                   "small": "https://market.akat.com.tm/api/uploads-service/storage/images/product/small/1659163539527.webp",
//                   "medium": "https://market.akat.com.tm/api/uploads-service/storage/images/product/medium/1659163539527.webp",
//                   "large": "https://market.akat.com.tm/api/uploads-service/storage/images/product/large/1659163539527.webp"
//               }
//           ],
//           "id": 348076,
//           "productId": "a345c20c-87d2-4148-9c07-0b33c213b72c",
//           "storeId": "5c5bdc43-8fd7-4492-9f05-99582b7f9540",
//           "statusId": 1,
//           "modelId": null,
//           "available": 1,
//           "priceFixed": true,
//           "minOrder": 1,
//           "sku": null,
//           "rating": 0,
//           "slug": "microgreen",
//           "group": "o_QfxY_lUq",
//           "brandId": 378,
//           "syncNeeded": false,
//           "createdAt": "2022-07-30T06:45:36.898Z",
//           "updatedAt": "2022-07-30T06:47:51.694Z",
//           "warranty": null,
//           "price": {
//               "price": "15.00"
//           },
//           "currentDiscount": null,
//           "detail": {
//               "title": "Сельдерей",
//               "description": "100 гр,\nСельдерей богат калием и витамином К, помогает снизить артериальное давление и нейтрализовать опасный холестерин за счет содержания фталидов. Витамин К и фосфор укрепляют кости, помогают предотвращать переломы."
//           },
//           "images": [
//               {
//                   "id": 1169154,
//                   "name": "1659163538066.webp"
//               },
//               {
//                   "id": 1169155,
//                   "name": "1659163539527.webp"
//               }
//           ],
//           "brand": {
//               "name": "Microgreen",
//               "avatar": "1659081325101.webp",
//               "avatarDark": "1659081325217.webp"
//           },
//           "store": {
//               "id": 53,
//               "storeId": "5c5bdc43-8fd7-4492-9f05-99582b7f9540",
//               "name": "Microgreen",
//               "slug": "microgreen",
//               "image": "store_1658992267785.webp",
//               "deliveryPrice": "20.00",
//               "freeShippingOver": null,
//               "rating": null,
//               "paymentTypeIds": null,
//               "multiplier": "1.00",
//               "discountInPercent": null
//           },
//           "hasOption": null,
//           "category": {
//               "categoryId": 2861
//           },
//           "categories": [
//               {
//                   "categoryId": 2861
//               },
//               {
//                   "categoryId": 2858
//               }
//           ],
//           "measurement": null
//       },
//       "options": [],
//       "shippings": []
//   }
// }