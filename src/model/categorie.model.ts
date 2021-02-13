import {SousCategorie} from './sous-categorie';

export class Categorie {
  id: number;
  name: string;
  sousCategories: Array<SousCategorie>;
}
