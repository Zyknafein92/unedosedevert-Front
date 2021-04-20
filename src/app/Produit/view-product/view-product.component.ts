import {Component, Input, OnInit} from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {ProduitService} from '../../../services/produit.service';
import {VariantService} from '../../../services/variant.service';
import {Variant} from '../../../model/variant.model';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../../services/tag.service';
import {Tag} from '../../../model/tag.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  produit: Produit;
  variants: Array<Variant>;
  tags: Array<Tag>;
  variantSelected: Variant;
  quantite: number;

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private produitService: ProduitService, private variantService: VariantService, private tagService: TagService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        console.log('id:', params.id);
        if (id) {
          this.initProduit(id);
          this.initVariants(id);
        }
      });
    this.quantite = 0;
  }

  private initProduit(id: number): void {
    this.produitService.getProduit(id).subscribe(data => {
      this.produit = data;
    });
  }

  private initVariants(id: number): void {
    this.variantService.getVariantsByProduitId(id).subscribe(data => {
      this.variants = data;
    });
  }

   selectVariant(variant: Variant): void {
     this.variantSelected = variant;
     if (this.variantSelected) {
       this.quantite = 0;
     }
   }

     changeQuantity(quantity: number): void {
       if ((this.quantite === 0 && quantity < 0) || !this.variantSelected) {
       return;
     }
       this.quantite += quantity;
   }

  private afficherPrix(prix: number): string {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(prix);
  }
}
