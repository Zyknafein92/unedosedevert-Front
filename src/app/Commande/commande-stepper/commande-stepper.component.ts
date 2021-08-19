import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import Stepper from 'bs-stepper';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {ShoppingCart} from '../../../model/shopping-cart.model';
import {UserService} from '../../../services/user.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-commande-stepper',
  templateUrl: './commande-stepper.component.html',
  styleUrls: ['./commande-stepper.component.css']
})
export class CommandeStepperComponent implements OnInit {

  private stepper: Stepper;
  email: string;
  shoppingCart: ShoppingCart;


  constructor(private token: TokenStorageService, private userService: UserService, private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.getElementById('stepper'), {
      linear: false,
      animation: false
    })
    this.email = this.token.getEmail();
    this.initData();
  }

  stepperNext = (): void => {
    this.stepper.next();
  }

  private initData() {
    if (this.token.getEmail() != null && this.token.getEmail() != '') {
      this.userService.getMyProfil().subscribe(res => {
        this.shoppingCartService.getShoppingCart(res.shoppingCart.id).subscribe(async data => {
          this.shoppingCart = {...data};
        });
      });
    } else {
      if (window.sessionStorage.getItem('shoppingCart') != null)
        this.shoppingCart = JSON.parse(window.sessionStorage.getItem('shoppingCart')).shoppingCartLines;
    }
  }

  shoppingCartChange($event: any) {
    this.initData();
  }
}
