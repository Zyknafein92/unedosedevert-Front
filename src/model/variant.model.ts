import {Stock} from './stock.model';

export class Variant {
  id: number;
  produitId: number;
  name: string;
  imageUrlOnSelect: any;
  imageUrlNonSelect: any;
  prix: number;
  prixKg: number;
  stock: Stock;
}
