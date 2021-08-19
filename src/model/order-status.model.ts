export enum OrderStatus {
  ATTENTE= 'En attente de validation.',
  VALIDE= 'Commande validée, en attente de prépraration.',
  INVALIDE= 'Paiement refusé.',
  PREPARATION= 'Commande en cours de préparation.',
  ATTENTE_LIVRAISON= 'Commande prête a être expédiée',
  LIVRAISON= 'Commande en cours de livraison.',
  TERMINE= 'Commande livrée.'
}
