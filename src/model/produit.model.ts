import {Categorie} from './categorie.model';
import {Type} from './type.model';
import {Variant} from './variant.model';
import {Tag} from './tag.model';
import {TagsCategorie} from './tags-categorie.model';

export class Produit {
  id: number;
  name: string;
  categorie: Categorie;
  type: Type;
  description: string;
  origine: string;
  variant = new Array<Variant>();
  tag = new Array<Tag>();
  tagsCategorie = new Array<TagsCategorie>();
  urlPhoto: any;
}
