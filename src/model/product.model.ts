import {Categorie} from './categorie.model';
import {Type} from './type.model';
import {Variant} from './variant.model';
import {Tag} from './tag.model';
import {Reduction} from './reduction.model';
import {Label} from './label';
import {SubCategorie} from './sub-categorie';

export class Product {
  id: number;
  title: string;
  brand: string;
  type: Type;
  categorie: Categorie;
  subCategorie: SubCategorie;
  tags = new Array<Tag>();
  labels = new Array<Label>();
  origin: string;
  productDescription: string;
  utilisationAdvice: string;
  composition: string;
  whyThisProduct: string;
  producer: string;
  producerComment: string;
  allergen: string;
  nutritionalInformation: string;
  additionalInformation: string;
  urlPicture1: any;
  urlPicture2: any;
  urlPicture3: any;
  variants = new Array<Variant>();
  reduction: Reduction;
}
