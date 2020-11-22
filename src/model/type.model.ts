import {Categorie} from './categorie.model';

export class Type {
  id: number;
  name: string;
  categories: Array<Categorie>;
}
