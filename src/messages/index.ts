export const urlNotFound = (lang: string) => {
    switch (lang) {
        case "en":
            return "URL not found";
        case "tk":
            return "URL tapylmady";
    
        default:
            return "URL не найден"
    }
}

export const orderCreated = (lang: string) => {
    switch (lang) {
        case "en":
            return "Order created";
        case "tk":
            return "Zakaz doredildi";
    
        default:
            return "Заказ добавлен"
    }
}

export const orderNotFound = (lang: string) => {
    switch (lang) {
        case "en":
            return "Order not found";
        case "tk":
            return "Zakaz tapylmady";
    
        default:
            return "Заказ не найден"
    }
}


export const cartNotFound = (lang: string) => {
    switch (lang) {
        case "en":
            return "Cart not found";
        case "tk":
            return "Sebet tapylmady";
    
        default:
            return "Корзина не найден"
    }
}

export const userIdEmpty = (lang: string) => {
    switch (lang) {
        case "en":
            return "userId empty";
        case "tk":
            return "userId boś";
    
        default:
            return "userId пустой"
    }
}

export const userNotFound = (lang: string) => {
    switch (lang) {
        case "en":
            return "User not found";
        case "tk":
            return "Ulanyjy tapylmady";
    
        default:
            return "Пользователь не найден"
    }
}

export const invalidCartProducts = (lang: string) => {
    switch (lang) {
        case "en":
            return "Cart products are not valid";
        case "tk":
            return "Sebetin produktlary yalnys";
    
        default:
            return "Продукты корзины невалидные"
    }
}