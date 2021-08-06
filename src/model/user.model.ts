import {Order} from './order.model';
import {Adress} from './adress.model';
import {ShoppingCart} from './shopping-cart.model';
import {RoleModel} from './role.model';

export class User {
  id: number;
  gender: string;
  orders = new Array<Order>();
  adresses = new Array<Adress>();
  roles?: Array<RoleModel>;
  shoppingCart: ShoppingCart;
  lastName: string;
  firstName: string;
  birthday: Date;
  email: string;
  password: string;
  active: boolean;
  newsletter: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiration: Date;
}
