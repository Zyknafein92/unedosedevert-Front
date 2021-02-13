import {Categorie} from './categorie.model';
import {Type} from './type.model';
import {Variant} from './variant.model';
import {Tag} from './tag.model';
import {Reduction} from './reduction.model';
import {Label} from './label';
import {SousCategorie} from './sous-categorie';

export class Produit {
  id: number;
  name: string;
  type: Type;
  categorie: Categorie;
  sousCategorie: SousCategorie;
  tags = new Array<Tag>();
  labels = new Array<Label>();
  origine: string;
  descriptionProduit: string;
  commentaireProduit: string;
  conseilUtilisation: string;
  composition: string;
  pourquoi: string;
  producteur: string;
  allergenes: string;
  infoNutrition: string;
  variant = new Array<Variant>();
  reduction: Reduction;
  urlPhoto: any;
}
