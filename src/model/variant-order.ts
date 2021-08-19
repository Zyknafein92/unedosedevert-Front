import {Product} from './product.model';

export class VariantOrder {

  id: number;
  idVariant: number;
  name: string;
  productDTO: Product;
  quantity: number;
  price: number;
  priceKg: number;
  reductionPrice: number;
}
