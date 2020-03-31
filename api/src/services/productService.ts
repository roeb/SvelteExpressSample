import { injectable } from 'inversify';
import 'reflect-metadata';
import { ProductModel, Product, productModeltoPublicModel } from '../models/product.models';
import { connect } from '../data/mongo';
import { ProductMap } from '../models/product.map';

export interface IProductService {
  getProduct(id: string): Promise<Product>;
  getProducts(): Promise<Product[]>;
}

@injectable()
export class ProductService implements IProductService {
  constructor() {
    connect();
  }

  async getProducts(): Promise<Product[]> {
    const products = await ProductModel.find();
    return products.map(ProductMap.toDomain); // <-- muss das nicht in den Controller???
  }

  async getProduct(id: string): Promise<Product> {
    const product = await await ProductModel.find({ id });
    if (product !== undefined && product.length === 1) {
      return productModeltoPublicModel(product[0]);
    }

    throw new Error(`Can't find a product with id ${id}`);
  }
}
