import {Stock} from './stock.model';

export class Variant {
  id: number;
  productId: number;
  name: string;
  price: number;
  priceKg: number;
  reductionPrice: number;
  stock: Stock;
}
