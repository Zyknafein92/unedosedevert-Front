import {User} from './user.model';
import {StatusCommande} from './status-commande.model';
import {Adresse} from './adresse.model';
import {VariantCommande} from './variant-commande';

export class Commande {
  id: number;
  user: User;
  date: Date;
  adresse: Adresse;
  variantCommandeList: Array<VariantCommande>
  total: number;
  statusCommande: StatusCommande;
  livraison: boolean;
}

