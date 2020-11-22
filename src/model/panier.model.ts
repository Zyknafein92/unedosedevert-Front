import {PanierLigne} from './panier-ligne.model';


export class Panier {
  id: number;
  panierlignes = new Array<PanierLigne>();
  prixTotal: number;
}
