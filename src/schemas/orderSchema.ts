import * as yup from "yup";

export const createOrderSchema = yup.object({
    location_id: yup.number().required('Location ID is required'),
    delivery_address: yup.string(),
    contact_phone: yup.string(),
    full_name: yup.string(),
    payment_type: yup.number().required('Payment Type is required'),
    cart_provider: yup.number(),
    note: yup.string(),
    store_id: yup.string().uuid('Store ID must be a valid UUID').required('Store ID is required'),
    delivery_time_id: yup.number(),
    cartId: yup.number().required('cartId is required')
});



// https://market.akat.com.tm/api/v3/checkout/my/8ff9fb64-7ac1-420e-bb17-31ea32151e35/complete/?lang=ru POST
// https://market.akat.com.tm/api/v3/checkout/my/8ff9fb64-7ac1-420e-bb17-31ea32151e35/detail/?lang=ru GET
// {
//     "location_id": 1,
//     "delivery_address": "11",
//     "contact_phone": "+99361111111",
//     "full_name": "A",
//     "payment_type": 2,
//     "cart_provider": 1,
//     "note": "22",
//     "store_id": "7b3dec77-7ee7-4374-bb90-8fde295a33a2",
//     "delivery_time_id": 53
// }