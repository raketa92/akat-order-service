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
