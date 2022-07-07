declare module '*.png';
declare interface Product {
    id: string
    name: string
    image: string
    purchasePrice: number
    salePrice: number
    creationTime: number
    creationDate: string
    creationSecond: number
    creationMinute: number
    creationHour: number
    creationDay: number
    creationMonth: number
    creationYear: number
}
declare interface ProductId {
    id: string
    name: string
    image: string
    quantity: number
    purchasePrice: number
    salePrice: number
    creationTime: number
    creationDate: string
    creationSecond: number
    creationMinute: number
    creationHour: number
    creationDay: number
    creationMonth: number
    creationYear: number
}
declare interface ProductSale {
    id: string
    quantity: number
    price: number
    deleted: boolean
}
declare interface ProductEntrance {
    id: string
    quantity: number
    price: number
    deleted: boolean
}
declare interface Payment {
    paymentType: string
    pay: number
}
declare interface Entrance {
    id: string
    products: Array<EntranceSale>
    price: number
    cancelled: boolean
    entranceDate: string
    entranceTime: number
    entranceSecond: number
    entranceMinute: number
    entranceHour: number
    entranceDay: number
    entranceMonth: number
    entranceYear: number
}
declare interface EntranceId {
    id: string
    products: Array<ProductEntrance>
    items: Array<ProductId>
    price: Nnmber
    cancelled: boolean
    entranceDate: string
    entranceTime: number
    entranceSecond: number
    entranceMinute: number
    entranceHour: number
    entranceDay: number
    entranceMonth: number
    entranceYear: number
}
declare interface AwaitingSale {
    client: string
    id: number
    products: Array<Product>
    productsQuantity: {
        [index: string]: number
    }
    payments: Array<Payment>
}
declare interface Sale {
    id: string
    products: Array<ProductSale>
    price: number
    cancelled: boolean
    payment: Array<Payment>
    saleDate: string
    saleTime: number
    saleSecond: number
    saleMinute: number
    saleHour: number
    saleDay: number
    saleMonth: number
    saleYear: number
}

declare interface SaleId {
    id: string
    products: Array<{
        id: string
        quantity: number
        price: number
        deleted: boolean
    }>
    price: number
    cancelled: boolean
    payment: Array<{
        paymentType: string
        pay: number
    }>
    saleDate: string
    saleTime: number
    saleSecond: number
    saleMinute: number
    saleHour: number
    saleDay: number
    saleMonth: number
    saleYear: number
    items: Array<ProductId>
}
declare interface Gain {
    id: string
    cancelled: boolean
    total: number
    weekday: number
    weekend: boolean
    holiday: boolean
    temperature: number
    gainDate: string
    gainTime: number
    gainSecond: number
    gainMinute: number
    gainHour: number
    gainDay: number
    gainMonth: number
    gainYear: number
}
declare interface Pix {
    endToEndId: string
    txid: string | number
    valor: string | number
    horario: string
    infoPagador: string
}