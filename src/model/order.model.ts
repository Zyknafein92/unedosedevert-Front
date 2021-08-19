import {User} from './user.model';
import {OrderStatus} from './order-status.model';
import {Adress} from './adress.model';
import {VariantOrder} from './variant-order';
import {ShoppingCart} from './shopping-cart.model';

export class Order {
  id: number;
  orderNumber: string;
  user: User;
  deliveryAdress: Adress;
  billingAdress: Adress;
  variantOrderDTOS: Array<VariantOrder>
  date: Date;
  total: number;
  deliveryCharges: number;
  orderStatus: OrderStatus;
  shoppingCart: ShoppingCart;
}

