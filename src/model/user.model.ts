import {Commande} from './commande.model';
import {Adresse} from './adresse.model';
import {Panier} from './panier.model';
import {RoleModel} from './role.model';

export class User {
  id: number;
  genre: string;
  commandes = new Array<Commande>();
  adresses = new Array<Adresse>();
  roles?: Array<RoleModel>;
  panier: Panier;
  nom: string;
  prenom: string;
  anniversaire: Date;
  telephone: string;
  email: string;
  password: string;
  active: boolean;
}
