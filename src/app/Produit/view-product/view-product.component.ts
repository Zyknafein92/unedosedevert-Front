import {Component, Input, OnInit} from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {ProduitService} from '../../../services/produit.service';
import {VariantService} from '../../../services/variant.service';
import {Variant} from '../../../model/variant.model';
import {ActivatedRoute} from '@angular/router';
import {Tag} from '../../../model/tag.model';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {PanierService} from '../../../services/panier.service';
import {FormGroup, Validators} from '@angular/forms';
import {PanierLigne} from '../../../model/panier-ligne.model';
import {UserService} from '../../../services/user.service';
import {Panier} from '../../../model/panier.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


  forms: FormGroup;
  produit: Produit;
  variants: Array<Variant>;
  tags: Array<Tag>;
  variantSelected: Variant;
  quantite: number;


  constructor(private activatedRoute: ActivatedRoute, private produitService: ProduitService,
              private variantService: VariantService, private tokenService: TokenStorageService,
              private panierService: PanierService, private userService: UserService) {
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

  private createPanierLigne(variant, quantite): PanierLigne {
    let panierLigne = new PanierLigne();
    panierLigne.id = null;
    panierLigne.variant = variant;
    panierLigne.produit = this.produit;
    panierLigne.quantity = quantite;
    panierLigne.prix = variant.prix * quantite;
    panierLigne.manualId = new Date().getTime();

   return panierLigne;
}

  addToShoppingCart(variantSelected: Variant, quantite: number) {
    let ligneToAdd = this.createPanierLigne(this.variantSelected, this.quantite);
    if (this.tokenService.getEmail() != null && this.tokenService.getEmail() != '') {
      this.userService.getMyProfil().subscribe(res => {
        console.log(res);
        this.panierService.addPanierLigne(ligneToAdd, res.panier.id).subscribe(response => {
          console.log('data', response);
        });
      });
    } else {
      let panierToSave = new Panier();

      let ligneToAdd = this.createPanierLigne(this.variantSelected, this.quantite);
      panierToSave.panierLignes.push(ligneToAdd);
      if (window.sessionStorage.getItem('panier') == null) {
        window.sessionStorage.setItem('panier', JSON.stringify(panierToSave));
        console.log(JSON.parse(window.sessionStorage.getItem('panier')));
      } else {
       panierToSave = JSON.parse(window.sessionStorage.getItem('panier'));
       panierToSave.panierLignes.push(ligneToAdd);
       window.sessionStorage.setItem('panier', JSON.stringify(panierToSave));
       console.log(JSON.parse(window.sessionStorage.getItem('panier')));
      }

      // // Panier <- ajouter élément dedans après avoir créer le panier
      // // Mettre à jour le panier front via wsS puis envoyer au back, clean session storage
      // window.sessionStorage.
    }
  }
}
