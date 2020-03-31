import mongoose from 'mongoose';

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
}

const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    category: String,
    name: String,
    price: Number,
  },
  {
    collection: 'products',
    read: 'nearest',
  },
);

const ProductModel = mongoose.model('Procuct', productSchema);

const productModeltoPublicModel = (document: mongoose.Document) => {
  const productModel = document.toObject();
  return {
    id: productModel.id,
    category: productModel.category,
    name: productModel.name,
    price: productModel.price,
  } as Product;
};


export { Product, ProductModel, productModeltoPublicModel };



