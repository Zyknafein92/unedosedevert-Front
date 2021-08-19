import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Order} from '../../../model/order.model';
import {VariantOrder} from '../../../model/variant-order';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  displayedColumns: string[] = ['Photo', 'Produit', 'Contenance', 'Quantité', 'Prix'];
  data: Array<VariantOrder>;
  totalPrice: number;

  constructor(public dialogRef: MatDialogRef<ViewOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  private initDataSource() {
    this.data = this.order.variantOrderDTOS
    console.log(this.order);
  }

  formatPrice(price: any) {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }

  close() {
    this.dialogRef.close();
  }
}
