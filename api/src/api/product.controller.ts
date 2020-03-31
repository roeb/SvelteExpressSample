import express from 'express';
import 'reflect-metadata';
import { IProductService } from '../services/productService';
import IBaseController from './base/controller';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { injectable, inject } from 'inversify';

@injectable()
class ProductController implements IBaseController {
  public path = '/products';
  public router = express.Router();

  constructor(@inject(SERVICE_IDENTIFIER.ProductService) private productService: IProductService) {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:productId`, this.getProductById);
  }

  getAllProducts = async (req: express.Request, res: express.Response) => {
    console.log('load products');
    const products = await this.productService.getProducts();
    res.status(200).send(products);
  };

  getProductById = async (req: express.Request, res: express.Response) => {
    const productId = req.params.productId;
    const product = await this.productService.getProduct(productId);
    res.status(200).send(product);
  };
}

export default ProductController;
