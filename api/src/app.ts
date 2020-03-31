import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import { checkJwtToken } from './middlewares/auth0';
import { injectable, inject } from 'inversify';
import ProductController from './api/product.controller';
import ShoppingCardController from './api/shoppingCard.controller';
import { SERVICE_IDENTIFIER } from './constants/identifiers';

@injectable()
class App {
  public app: express.Application;
  public port: number = +process.env.API_PORT || 3000;

  constructor(
    @inject(SERVICE_IDENTIFIER.ProductController) private productController: ProductController,
    @inject(SERVICE_IDENTIFIER.ShoppingCardController) private shoppingCardController: ShoppingCardController,
  ) {
    this.app = express();

    this.app.use(
      cors({
        origin: 'http://localhost:5000',
      }),
    );

    this.initializeMiddlewares();
    this.initializeControllers();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(checkJwtToken());
  }

  private initializeControllers() {
    this.app.use('/', this.productController.router);
    this.app.use('/', this.shoppingCardController.router);

    this.app.get('/status', (req, res) => {
      res.status(200).send(`Status: OK. Server time: ${new Date().toLocaleTimeString()}`);
    });

    this.app.use('*', (req, res) => {
      res.status(404).send('Not Found');
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`API is listening on the port ${this.port}`);
    });
  }
}

export default App;
