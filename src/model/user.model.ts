import {Commande} from './commande.model';
import {Adresse} from './adresse.model';
import {Panier} from './panier.model';
import {Role} from './role';

export class User {
  id: number;
  commandes = new Array<Commande>();
  adresses = new Array<Adresse>();
  roles?: Array<Role>;
  panier: Panier;
  nom: string;
  prenom: string;
  anniversaire: Date;
  telephone: string;
  email: string;
  password: string;
  active: boolean;
}
