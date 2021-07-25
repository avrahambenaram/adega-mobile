declare module '*.png';
declare interface Product {
    id: string
    name: string
    image: string
    purchasePrice: number
    salePrice: number
    quantity: number
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
    items: Array<Product>
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
    items: Array<Product>
}