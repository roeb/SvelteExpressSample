import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from './constants/identifiers';
import { IProductService, ProductService } from './services/productService';
import { ShoppingCardService } from './services/shoppingcardService';
import App from './app';
import ProductController from './api/product.controller';
import ShoppingCardController from './api/shoppingCard.controller';

const container = new Container();
container.bind<IProductService>(SERVICE_IDENTIFIER.ProductService).to(ProductService);
container.bind<ShoppingCardService>(SERVICE_IDENTIFIER.ShoppingCardService).to(ShoppingCardService);
container.bind<ProductController>(SERVICE_IDENTIFIER.ProductController).to(ProductController);
container.bind<ShoppingCardController>(SERVICE_IDENTIFIER.ShoppingCardController).to(ShoppingCardController);
container.bind<App>(SERVICE_IDENTIFIER.ShoppingCardApi).to(App);

export { container };
