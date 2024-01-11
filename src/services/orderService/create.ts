import { OrderStatuses } from "../../constants/statuses";
import { orderNotFound } from "../../messages";
import { Order } from "../../models";

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
    token?: string;
    checkoutToken?: string;
    fullName?: string;
    contactPhone?: string;
    languageCode?: string;
    isPaid?: boolean;
    note?: string;
}


const create = async (data: Data, lang: string): Promise<Order> => {
    const createData: OrderCreate = {
        storeId: data.store_id,
        currency: "TMT",
        orderNumber: "2024010722253200000519",
        orderStatus: OrderStatuses.Processing,
        paymentType: data.payment_type,
        deliveryLocationId: 0,
        deliveryAddress: data.delivery_address,
        note: data.note,
        deliveryTimeId: data.delivery_time_id,
        deliveryPriceAmount: 0,
        shippingPriceAmount: 160,
        priceAmount: 0,
        discountAmount: 0,
        totalAmount: 0,
        fullName: data.full_name,
        contactPhone: data.contact_phone,
    }
    const order = await Order.create(createData);

    if (!order) {
        throw ({ reason: orderNotFound(lang), status: 200 })
    }

    return order;
};

export default create;
