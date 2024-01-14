import * as yup from "yup";

export const addToCartSchema = yup.object({
    productId: yup.string().required('productId required'),
    storeId: yup.string().required('storeId required'),
    shippingType: yup.string(),
    shippingPriceAmount: yup.number(),
});

export const updateCartSchema = yup.object({
    productId: yup.string().required('productId required'),
    storeId: yup.string().required('storeId required'),
    quantity: yup.number().required('quantity required'),
});