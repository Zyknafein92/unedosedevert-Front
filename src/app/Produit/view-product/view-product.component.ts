import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ProductService} from '../../../services/product.service';
import {VariantService} from '../../../services/variant.service';
import {Variant} from '../../../model/variant.model';
import {ActivatedRoute} from '@angular/router';
import {Tag} from '../../../model/tag.model';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {FormGroup} from '@angular/forms';
import {ShoppingCartLine} from '../../../model/shopping-cart-line.model';
import {UserService} from '../../../services/user.service';
import {ShoppingCart} from '../../../model/shopping-cart.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


  forms: FormGroup;
  product: Product;
  variants: Array<Variant>;
  tags: Array<Tag>;
  variantSelected: Variant;
  quantity: number;


  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private variantService: VariantService, private tokenService: TokenStorageService,
              private shoppingCartService: ShoppingCartService, private userService: UserService) {
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
    this.quantity = 0;
  }

  private initProduit(id: number): void {
    this.productService.getProduit(id).subscribe(data => {
      this.product = data;
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
      this.quantity = 0;
    }
  }

  changeQuantity(quantity: number): void {
    if ((this.quantity === 0 && quantity < 0) || !this.variantSelected) {
      return;
    }
    this.quantity += quantity;
  }

  displayPrice(prix: number): string {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(prix);
  }

  private createPanierLigne(variant, quantite): ShoppingCartLine {
    let shoppingCartLine = new ShoppingCartLine();
    shoppingCartLine.id = null;
    shoppingCartLine.variant = variant;
    shoppingCartLine.product = this.product;
    shoppingCartLine.quantity = quantite;
    if (variant.reductionPrice != null ) {
      shoppingCartLine.price = variant.reductionPrice * quantite;
    } else {
      shoppingCartLine.price = variant.price * quantite;
    }
    shoppingCartLine.manualId = new Date().getTime();
    return shoppingCartLine;
  }

  addToShoppingCart(variantSelected: Variant, quantite: number) {
    let ligneToAdd = this.createPanierLigne(this.variantSelected, this.quantity);
    console.log(ligneToAdd)
    if (this.tokenService.getEmail() != null && this.tokenService.getEmail() != '') {
      this.userService.getMyProfil().subscribe(res => {
        console.log(res);
        this.shoppingCartService.addShoppingCartLine(ligneToAdd).subscribe(response => {
          console.log('data', response);
        });
      });
    } else {
      let shoppingCartToSave = new ShoppingCart();

      let ligneToAdd = this.createPanierLigne(this.variantSelected, this.quantity);
      shoppingCartToSave.shoppingCartLines.push(ligneToAdd);
      if (window.sessionStorage.getItem('shoppingCart') == null) {
        window.sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCartToSave));
        console.log(JSON.parse(window.sessionStorage.getItem('shoppingCart')));
      } else {
        shoppingCartToSave = JSON.parse(window.sessionStorage.getItem('shoppingCart'));
        shoppingCartToSave.shoppingCartLines.push(ligneToAdd);
        window.sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCartToSave));
        console.log(JSON.parse(window.sessionStorage.getItem('shoppingCart')));
      }
    }
  }
}
