import {Produit} from './produit.model';

export class VariantCommande {

  id: number;
  idVariant: number;
  name: string;
  produit: Produit;
  quantity: number;
  prix: number;
  prixKg: number;
  prixReduction: number;
}
