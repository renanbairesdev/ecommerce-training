import { IProduct } from "./product.d";

export interface ICartProduct extends IProduct {
  quantity: number;
}
