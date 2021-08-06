
import {Variant} from './variant.model';
import {Product} from './product.model';

export class ShoppingCartLine {
  id: number;
  variant: Variant;
  product: Product;
  quantity: number;
  price: number;

  manualId: number;
}
