import {Variant} from '../model/variant.model';
import {VariantCommande} from '../model/variant-commande';

export class VariantMapper {
  variant: Variant;
  variantCommande: VariantCommande;

  public mapVariantToVariantCommande(variant: Variant): VariantCommande {
    this.variantCommande.idVariant = this.variant.id;
    this.variantCommande.name = this.variant.name;
    this.variantCommande.prix = this.variant.prix;
    this.variantCommande.prixKg = this.variant.prixKg;
    this.variantCommande.prixReduction = this.variant.prixReduction;
    return this.variantCommande;
  }
}
