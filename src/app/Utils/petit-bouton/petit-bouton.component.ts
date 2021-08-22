import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-petit-bouton',
  templateUrl: './petit-bouton.component.html',
  styleUrls: ['./petit-bouton.component.css']
})
export class PetitBoutonComponent implements OnInit {
  @Input()
  label: string;
  @Input()
  fontSize: any;
  @Input()
  selected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
