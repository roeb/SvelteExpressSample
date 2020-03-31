import mongoose from 'mongoose';
import { Mapper } from "./mapper";
import { Product } from "./product.models";

class ProductMap extends Mapper<Product> {
  public static toDomain(document: mongoose.Document): Product {
    const productModel = document.toObject();
    return {
      id: productModel.id,
      category: productModel.category,
      name: productModel.name,
      price: productModel.price,
    } as Product;
  }
}

export {ProductMap};