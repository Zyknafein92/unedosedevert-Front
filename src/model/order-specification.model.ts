import {User} from './user.model';
import {OrderStatus} from './order-status.model';

export class OrderSpecification {
  orderNumber: string;
  userEmail: string;
  orderStatus: OrderStatus;
}
