import {Component, Input, OnInit} from '@angular/core';
import {Produit} from '../../../../model/produit.model';
import {Variant} from '../../../../model/variant.model';

@Component({
  selector: 'app-carte-produit',
  templateUrl: './carte-produit.component.html',
  styleUrls: ['./carte-produit.component.css']
})
export class CarteProduitComponent implements OnInit {
  @Input()
  produit: Produit;
  variants: Array<Variant>;
  nombre: number;

  constructor() { }

  ngOnInit(): void {
    this.nombre = 0;
    this.variants = this.produit.variants;
    console.log(this.variants);
    console.log('Trololo');
  }

}
