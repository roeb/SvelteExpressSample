import App from './app';
import { SERVICE_IDENTIFIER } from './constants/identifiers';
import { container } from './inversify.config';

const shoppingCardApi = container.get<App>(SERVICE_IDENTIFIER.ShoppingCardApi);
shoppingCardApi.listen();
