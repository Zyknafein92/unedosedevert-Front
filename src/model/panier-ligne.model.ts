import {Produit} from './produit.model';

export class PanierLigne {
  id: number;
  produit: Produit;
  quantity: number;
  prix: number;
}
