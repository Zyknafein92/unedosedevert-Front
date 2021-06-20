import {PanierLigne} from './panier-ligne.model';


export class Panier {
  id: number;
  panierLignes = new Array<PanierLigne>();
  prixTotal: number;
}
