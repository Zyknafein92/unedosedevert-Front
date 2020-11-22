import {Categorie} from './categorie.model';
import {Type} from './type.model';
import {Stock} from './stock.model';

export class Produit {
  id: number;
  name: string;
  categorie: Categorie;
  type: Type;
  description: string;
  origine: string;
  prix: number;
  tva: number;
  stock: Stock;
}
