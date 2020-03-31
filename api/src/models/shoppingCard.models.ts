import { Product } from "./product.models";

export interface ShoppingCardItem {
    product: Product;
    amount: number;
    sum: number;
}