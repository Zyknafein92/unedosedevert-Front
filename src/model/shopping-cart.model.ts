import {ShoppingCartLine} from './shopping-cart-line.model';


export class ShoppingCart {
  id: number;
  shoppingCartLines = new Array<ShoppingCartLine>();
  totalPrice: number;
}
