import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../Modal/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  city: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('load component');
    this.city = 'Paris';
    this.name = 'Jérome';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '350px',
      data: {name: this.name, city: this.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé: ', result);
    });
  }

}
