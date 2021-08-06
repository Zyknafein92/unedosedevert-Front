import {User} from './user.model';
import {StatusOrder} from './status-order.model';
import {Adress} from './adress.model';
import {VariantOrder} from './variant-order';
import {ShoppingCart} from './shopping-cart.model';

export class Order {
  id: number;
  orderNumber: string;
  user: User;
  deliveryAdress: Adress;
  billingAdress: Adress;
  variantCommandeList: Array<VariantOrder>
  date: Date;
  total: number;
  deliveryCharges: number;
  statusOrder: StatusOrder;
  shoppingCart: ShoppingCart;
}

