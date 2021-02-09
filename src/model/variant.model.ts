import {Reduction} from './reduction.model';

export class Variant {
  id: number;
  image: string;
  prix: number;
  tva: number;
  reduction: Reduction;
}
