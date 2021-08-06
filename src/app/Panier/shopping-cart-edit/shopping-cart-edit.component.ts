import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {UserService} from '../../../services/user.service';
import {ShoppingCartLine} from '../../../model/shopping-cart-line.model';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Variant} from '../../../model/variant.model';
import {FormControl, Validators} from '@angular/forms';
import {ShoppingCart} from '../../../model/shopping-cart.model';


@Component({
  selector: 'app-panier-edit',
  templateUrl: './shopping-cart-edit.component.html',
  styleUrls: ['./shopping-cart-edit.component.css']
})
export class ShoppingCartEditComponent implements OnChanges {

  displayedColumns: string[] = ['Photo', 'Produit', 'Contenance', 'Quantité', 'Prix', 'Retirer'];
  data: Array<ShoppingCartLine>;
  quantitySelected: FormControl;
  @Input()
  shoppingCart: ShoppingCart;
  @Input()
  toDelivery: () => void;


  constructor(private shoppingCartService: ShoppingCartService, private userService: UserService, private token: TokenStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', changes['shoppingCart'].currentValue);
    this.initDatasource();
  }

  initQuantityForm(){
    this.quantitySelected = new FormControl('', [Validators.required]);
  }

  deleteShoppingCartLine(shoppingCartLine) {
    if (!shoppingCartLine.id) {
     let sessionStorageLine = JSON.parse(window.sessionStorage.getItem('shoppingCart')).shoppingCartLines.filter(v => v.manualId != shoppingCartLine.manualId);
     window.sessionStorage.setItem('shoppingCart', JSON.stringify(sessionStorageLine));
     this.data = sessionStorageLine;
    } else {
      this.shoppingCartService.deleteShoppingCartLine(shoppingCartLine.id).subscribe(res => {
        this.initDatasource();
      })
    }

  }

  private initDatasource() {
      if(this.shoppingCart) {
        this.data = this.shoppingCart.shoppingCartLines;
      }
  }

  changeVariant(shoppingCartLine: ShoppingCartLine, variant: Variant) {
    shoppingCartLine.variant = variant;
    shoppingCartLine.price = variant.price * shoppingCartLine.quantity;
    if (!shoppingCartLine.id) {
      window.sessionStorage.setItem('shoppingCart', JSON.stringify(this.data));
    } else {
      this.shoppingCartService.updateShoppingCartLine(shoppingCartLine).subscribe(res => {
        this.initDatasource();
      });
    }
  }

 //todo: prix reduction a traiter
  changeQuantity($event, shoppingCartLine: ShoppingCartLine) {
    let newQuantity = $event.target.value;
    shoppingCartLine.quantity = newQuantity;
    shoppingCartLine.price = shoppingCartLine.variant.price * newQuantity
    if (!shoppingCartLine.id) {
      window.sessionStorage.setItem('shoppingCart', JSON.stringify(this.data));
    } else {
      this.shoppingCartService.updateShoppingCartLine(shoppingCartLine).subscribe(res => {
        this.initDatasource();
      });
    }
  }

  deliveryStep() {
    if(this.toDelivery){
      this.toDelivery();
    }

  }

  displayTotalPrice() {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(this.shoppingCart.totalPrice);
  }

  formatPrice(price: any) {
      const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      return formatter.format(price);
    }

}
