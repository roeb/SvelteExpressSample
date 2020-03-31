import { injectable } from 'inversify';
import 'reflect-metadata';
import { ShoppingCardItem } from '../models/shoppingCard.models';
import { Product } from '../models/product.models';

export interface IShoppingCardService {
  getItems(): ShoppingCardItem[];
  addItem(product: Product, amount: number): void;
  removeItem(articleId: string) : void;
}

@injectable()
export class ShoppingCardService implements IShoppingCardService {
  myShoppingCardItems: ShoppingCardItem[];
  constructor() {
    this.myShoppingCardItems = new Array<ShoppingCardItem>();
  }

  getItems(): ShoppingCardItem[] {
    return this.myShoppingCardItems;
  }

  addItem(product: Product, amount: number) {
    if (this.myShoppingCardItems.find(m => m.product.id === product.id) === undefined) {
      this.myShoppingCardItems.push({ product, amount, sum: product.price * amount });
    }
  }

  removeItem(articleId: string) {
    if (this.myShoppingCardItems.find(m => m.product.id === articleId) !== undefined) {
      this.myShoppingCardItems = this.myShoppingCardItems.filter(m => m.product.id !== articleId);
    }
  }
}
