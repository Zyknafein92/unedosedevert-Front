import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {VariantOrder} from '../../../model/variant-order';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ViewOrderComponent} from '../../Commande/view-order/view-order.component';
import {Order} from '../../../model/order.model';
import {OrderService} from '../../../services/order.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Adress} from '../../../model/adress.model';

@Component({
  selector: 'app-admin-order-edit',
  templateUrl: './admin-order-edit.component.html',
  styleUrls: ['./admin-order-edit.component.css']
})
export class AdminOrderEditComponent implements OnInit {

  displayedColumns: string[] = ['Photo', 'Produit', 'Contenance', 'Quantité', 'Prix'];
  data: Array<VariantOrder>;
  totalPrice: number;
  formsDelivery: FormGroup;
  formsBilling: FormGroup;

  constructor(public dialogRef: MatDialogRef<ViewOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order,
              private orderService: OrderService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initDataSource();
    this.initFormAddress();
    this.initFormsDelivery();
    this.initFormsBilling();

    if (this.order.deliveryAdress != null) {
      this.patchValue(this.formsDelivery, this.order.deliveryAdress)
    }

    if (this.order.billingAdress != null) {
      this.patchValue(this.formsBilling, this.order.billingAdress)
    }

  }


  private initDataSource() {
    this.data = this.order.variantOrderDTOS
    console.log(this.order);
  }

  private initFormsDelivery(): void {
    this.formsDelivery = this.initFormAddress();
    this.formsDelivery.disable();
  }

  private initFormsBilling(): void {
    this.formsBilling = this.initFormAddress();
    this.formsBilling.disable();
  }

  private initFormAddress() {
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
        interphone: ['', Validators.required],
        floor: ['', Validators.required],
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

  private patchValue(form: FormGroup, adress: Adress) {
    return form.patchValue({
      id: adress.id,
      gender: adress.gender,
      adressName: adress.adressName,
      lastName: adress.lastName,
      firstName: adress.firstName,
      phone: adress.phone,
      digicode: adress.digicode,
      interphone: adress.interphone,
      floor: adress.floor,
      appartNumber: adress.appartNumber,
      building: adress.building,
      number: adress.number,
      street: adress.street,
      postalCode: adress.postalCode,
      city: adress.city,
      information: adress.information,
      delivery: adress.delivery,
      billing: adress.billing,
    });
  }


  formatPrice(price: any) {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }

  setOrderStatusPicking() {
    this.orderService.updateOrderStatusAfterOrderPicking(this.order.orderNumber).subscribe();
  }

  setOrderStatusReadyToDelivery() {
    this.orderService.updateOrderStatusToReadyDelivery(this.order.orderNumber).subscribe();
  }

  setOrderStatusDelivery() {
    this.orderService.updateOrderStatusToDelivery(this.order.orderNumber).subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
