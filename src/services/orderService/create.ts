import { OrderStatuses } from "../../constants/statuses";
import { cartNotFound, invalidCartProducts, orderNotFound, userNotFound } from "../../messages";
import { Order } from "../../models";
import Cart from "../../models/cart";
import CartItems from "../../models/cartItems";
import OrderItems from "../../models/orderItems";
import generateOrderNumber from "../../utils/orderNumberGenerator";
import getCartDataByFilters from "../cartService/getCartItems";
import { getProducts } from "../productService";
import { Product } from "../productService/getProducts";
import { getUser } from "../userService";

type Data = {
    location_id: number,
    delivery_address?: string;
    contact_phone?: string;
    full_name?: string;
    payment_type: number;
    cart_provider?: number;
    note?: string;
    store_id: string;
    delivery_time_id?: number;
    cartId: number;
}

type OrderCreate = {
    anonymous_token?: string;
    userId?: string;
    storeId: string;
    currency: string;
    orderNumber: string;
    orderStatus: string;
    cardProvider?: number;
    paymentType: number;
    deliveryDate?: Date;
    deliveryLocationId: number;
    deliveryAddress?: string;
    deliveryTimeId?: number;
    deliveryPriceAmount: number;
    shippingPriceAmount: number;
    priceAmount: number;
    discountAmount: number;
    totalAmount: number;
    fullName?: string;
    contactPhone?: string;
    languageCode?: string;
    note?: string;
}

type OrderItemCreate = {
    orderId: number;
    productId: string;
    quantity: number;
    baseUnitPriceAmount: number;
    unitDiscountAmount: number;
    priceAmount: number;
    discountAmount: number;
    totalAmount: number;
    shippingPriceAmount: number;
    shippingType: string;
    logisticCode: string;
    productLink: string;
    deliveryStatus?: string;
}

type ProductData = Omit<OrderItemCreate, "orderId" | "deliveryStatus">;

type CartItemsData = {
    cartId: number;
    productId: string;
    quantity: number;
    shippingType?: string | null;
    shippingPriceAmount?: number;
    currency: string;
}
interface ICartItemDetails {
    [index: string]: CartItemsData;
}



const create = async (data: Data, lang: string): Promise<Order> => {
    const cart = await getCartDataByFilters({id: data.cartId});
    if (!cart) {
        throw ({ reason: cartNotFound(lang), status: 404 })
    }
    const products: Product[] = [];
    for(const item of cart.CartItems) {
        const product = await getProducts(item.productId);
        if (product) {
            products.push(product);
        }
    }
    if (!products.length) {
        throw ({ reason: invalidCartProducts(lang), status: 400 })
    }

    const cartItems = {} as ICartItemDetails;
    const productsData: ProductData[] = [];
    cart.CartItems.forEach((item) => {
        const detail: CartItemsData = item;
        cartItems[detail.productId] = detail;
    });
    products.forEach((product) => {
        const foundProduct = cartItems[product.productId];
        if (foundProduct) {
            const quantity = foundProduct.quantity;
            const price = +product.price.price;
            const totalAmount = price * quantity
            productsData.push({
                productId: foundProduct.productId,
                quantity: foundProduct.quantity,
                baseUnitPriceAmount: price,
                unitDiscountAmount: product.currentDiscount ? +product.currentDiscount : 0,
                priceAmount: price,
                discountAmount: product.currentDiscount ? +product.currentDiscount : 0,
                totalAmount: totalAmount,
                shippingPriceAmount: foundProduct.shippingPriceAmount ? +foundProduct.shippingPriceAmount : 0,
                // check payload if local product has shipping type and shipping price
                shippingType: foundProduct?.shippingType,
                logisticCode: "",
                productLink: "",
            })
        }
    });

    const totalProductPrice = productsData.reduce((prev, current) => prev + current.totalAmount, 0);
    const totalDiscount = productsData.reduce((prev, current) => prev + current.discountAmount, 0);
    const totalAmount = totalProductPrice - totalDiscount;
    const createData: OrderCreate = {
        storeId: data.store_id,
        userId: cart.userId,
        anonymous_token: cart.anonymous_token,
        currency: "TMT",
        orderNumber: generateOrderNumber(),
        orderStatus: OrderStatuses.Processing,
        paymentType: data.payment_type,
        deliveryLocationId: data.location_id,
        deliveryAddress: data.delivery_address,
        note: data.note,
        deliveryTimeId: data.delivery_time_id,
        deliveryPriceAmount: 0,
        shippingPriceAmount: 160,
        priceAmount: 0,
        discountAmount: totalDiscount,
        totalAmount,
        fullName: data.full_name,
        contactPhone: data.contact_phone,
    };
    const order = await Order.create(createData);

    if (!order) {
        throw ({ reason: orderNotFound(lang), status: 200 })
    }

    const orderItems: OrderItemCreate[] = [];

    productsData.forEach((item) => {
        orderItems.push({
            ...item,
            orderId: order.id,
        });
    })

    await OrderItems.bulkCreate(orderItems);

    return order;
};

export default create;
