import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Adress} from '../../../model/adress.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShoppingCart} from '../../../model/shopping-cart.model';
import {PaymentService} from '../../../services/payment.service';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../model/order.model';
import {Payment} from '../../../model/payment.model';
import {loadStripe} from '@stripe/stripe-js';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.css']
})
export class DeliveryEditComponent implements OnInit, OnChanges {

  adressList: Array<Adress>;
  adresseToCreate: Adress;
  deliveryAdress: Adress;
  deliveryAdressEdit = false;
  billingAdress: Adress;
  formsDelivery: FormGroup;
  formsBilling: FormGroup;
  formsAdresse: FormGroup;
  order: Order;
  @Input()
  shoppingCart: ShoppingCart;
  formgroups = {};
  payement: Payment;
  stripePromise = loadStripe(environment.stripe_key);


  constructor(private formBuilder: FormBuilder, private userService: UserService, private paymentService: PaymentService, private orderService: OrderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initAdressList();
    this.initForm();
    this.initFormsDelivery();
    this.initFormsBilling();
    this.formsDelivery.disable();
    this.formsBilling.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private initAdressList() {
    this.userService.getMyProfil().subscribe(data => {
      data.adresses.forEach(add => {
        this.formgroups[add.id] = this.initForm();
        this.patchValue(this.formgroups[add.id], add);
        this.formgroups[add.id].disable();
      })

      this.adressList = data.adresses;

      if (this.adressList) {
        this.deliveryAdress = this.adressList.find(c => c.delivery === true);
        this.billingAdress = this.adressList.find(a => a.billing === true);
        if (this.deliveryAdress) this.patchValue(this.formsDelivery, this.deliveryAdress);
        if (this.billingAdress) this.patchValue(this.formsBilling, this.billingAdress);
      }
    });
  }

  private initForm() {
    return this.formBuilder.group(
      {
        id: [''],
        gender: ['', Validators.required],
        adressName: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])),
        digicode: [''],
        interphone: [''],
        floor: [''],
        appartNumber: [''],
        building: [''],
        number: ['', Validators.required],
        street: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        information: [''],
        delivery: [false],
        billing: [false],
      }
    );
  }

  private initFormsDelivery(): void {
    this.formsDelivery = this.initForm();
  }

  private initFormsBilling(): void {
    this.formsBilling = this.initForm();
  }

  private patchValue(form: FormGroup, add: Adress) {
    this.formsAdresse = form;
    this.adresseToCreate = add;
    this.formsAdresse.patchValue({
      id: this.adresseToCreate.id,
      gender: this.adresseToCreate.gender,
      adressName: this.adresseToCreate.adressName,
      lastName: this.adresseToCreate.lastName,
      firstName: this.adresseToCreate.firstName,
      phone: this.adresseToCreate.phone,
      digicode: this.adresseToCreate.digicode,
      interphone: this.adresseToCreate.interphone,
      floor: this.adresseToCreate.floor,
      appartNumber: this.adresseToCreate.appartNumber,
      building: this.adresseToCreate.building,
      number: this.adresseToCreate.number,
      street: this.adresseToCreate.street,
      postalCode: this.adresseToCreate.postalCode,
      city: this.adresseToCreate.city,
      information: this.adresseToCreate.information,
      delivery: this.adresseToCreate.delivery,
      billing: this.adresseToCreate.billing,
    });
  }

  updateDisplayDeliveryAdress(adress: Adress) {
    this.deliveryAdress = adress;
    this.patchValue(this.formsDelivery, adress);
  }

  updateDisplayBillingAdress(adress: Adress) {
    this.billingAdress = adress;
    this.patchValue(this.formsBilling, adress);
  }

  selectChangeDeliveryAdress(event) {
    this.updateDisplayDeliveryAdress(event.value);
  }

  selectChangeBillingAdress(event) {
    this.updateDisplayBillingAdress(event.value);
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

  checkout(): void {
    this.order = new Order();
    if (this.deliveryAdress && this.billingAdress) {
      this.order.deliveryAdress = this.deliveryAdress;
      this.order.billingAdress = this.billingAdress;
      this.orderService.createOrder(this.order).subscribe(response => {
        if (this.order != null) {
          this.toastr.success('Vous allez être redirigé dans un instant');
          this.payement = new Payment();
          let price = parseFloat(response.total.toFixed(2));
          this.payement.price = price * 100;
          this.payement.productName = response.orderNumber;
          this.payement.quantity = 1;
          this.paymentService.checkout(this.payement).subscribe(async data => {
              const stripe = await this.stripePromise;
              const {error} = await stripe.redirectToCheckout({
                  sessionId: data.sessionId
                });
            });
        } else {
          this.toastr.error('Une erreure est survenue');
        }
      this.userService.cleanShoppingCart().subscribe();
      });
    }
  }
}
