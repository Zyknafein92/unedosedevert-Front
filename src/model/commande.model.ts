import {User} from './user.model';
import {StatusCommande} from './status-commande.model';
import {ModeReglement} from './mode-reglement.model';

export class Commande {
  id: number;
  user: User;
  date: Date;
  total: number;
  statusCommande: StatusCommande;
  modeReglement: ModeReglement;
  livraison: boolean;
}

