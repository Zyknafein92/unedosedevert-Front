import { Component, OnInit } from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {PanierService} from '../../../services/panier.service';
import {UserService} from '../../../services/user.service';
import {PanierLigne} from '../../../model/panier-ligne.model';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Variant} from '../../../model/variant.model';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-panier-edit',
  templateUrl: './panier-edit.component.html',
  styleUrls: ['./panier-edit.component.css']
})
export class PanierEditComponent implements OnInit {

  displayedColumns: string[] = ['Photo', 'Produit', 'Contenance', 'Quantité', 'Prix', 'Retirer'];
  data: Array<PanierLigne>;
  quantitySelected: FormControl;
  variantSelected: Variant;

  constructor(private pannierService: PanierService, private userService: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.initDatasource();
  }

  initQuantityForm(){
    this.quantitySelected = new FormControl('', [Validators.required]);
  }

  supprimerLigne(panierLigne) {
    if (!panierLigne.id) {
     let sessionStorageLine = JSON.parse(window.sessionStorage.getItem('panier')).panierlignes.filter(v => v.manualId != panierLigne.manualId);
     window.sessionStorage.setItem('panier', JSON.stringify(sessionStorageLine));
     this.data = sessionStorageLine;
    } else {
      this.pannierService.deletePanierLigne(panierLigne.id).subscribe( res => {
        this.initDatasource();
      })
    }

  }

  private initDatasource() {
    let panierLignes = new Array(PanierLigne);
    console.log(this.token.getEmail());
    if (this.token.getEmail() != null && this.token.getEmail() != '') {
      this.userService.getMyProfil().subscribe(res => {
        this.pannierService.getPanier(res.panier.id).subscribe(data => {
        this.data = data.panierLignes;
        });
      });
    } else {
      if (window.sessionStorage.getItem('panier') != null)
     this.data = JSON.parse(window.sessionStorage.getItem('panier')).panierlignes;
    }
  }

  changeVariant(panierLigne: PanierLigne, variant: Variant) {
    panierLigne.variant = variant;
    panierLigne.prix = variant.prix * panierLigne.quantity;
    if (!panierLigne.id) {
      window.sessionStorage.setItem('panier', JSON.stringify(this.data));
    } else {
      this.pannierService.updatePanierLigne(panierLigne).subscribe( res => {
        this.initDatasource();
      });
    }
  }
 //todo: prix reduction a traiter
  changeQuantity($event, panierLigne: PanierLigne) {
    let newQuantity = $event.target.value;
    panierLigne.quantity = newQuantity;
    panierLigne.prix = panierLigne.variant.prix * newQuantity
    if (!panierLigne.id) {
      window.sessionStorage.setItem('panier', JSON.stringify(this.data));
    } else {
      this.pannierService.updatePanierLigne(panierLigne).subscribe( res => {
        this.initDatasource();
      });
    }
  }
}
