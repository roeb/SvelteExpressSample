import express from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { IShoppingCardService } from '../services/shoppingcardService';
import { IProductService } from '../services/productService';
import IBaseController from './base/controller';
import { AddArticleToCardReq } from '../models/request.models';

@injectable()
class ShoppingCardController implements IBaseController {
  public path = '/shoppingCard';
  public router = express.Router();

  constructor(
    @inject(SERVICE_IDENTIFIER.ProductService) private productService: IProductService,
    @inject(SERVICE_IDENTIFIER.ShoppingCardService) private shoppingCardService: IShoppingCardService,
  ) {
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.get(this.path, this.getShoppingCard);
    this.router.post(this.path, this.addItemToShoppindCard);
    this.router.delete(`${this.path}/:productId`, this.removeItemFromShoppingCard);
  }

  getShoppingCard = (req: express.Request, res: express.Response) => {
    const items = this.shoppingCardService.getItems();
    res.status(200).send(items);
  };

  addItemToShoppindCard = async (req: express.Request, res: express.Response) => {
    const requestData = req.body as AddArticleToCardReq;
    const product = await this.productService.getProduct(requestData.productId);

    this.shoppingCardService.addItem(product, requestData.amount);
    res.status(200).send();
  };

  removeItemFromShoppingCard = (req: express.Request, res: express.Response) => {
    const productId = req.params.productId;

    if (productId === undefined) {
      res.status(400).send('ProductId is missing');
      return;
    }

    this.shoppingCardService.removeItem(productId);

    return res.status(200).send();
  };
}

export default ShoppingCardController;
