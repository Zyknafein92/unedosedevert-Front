import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bouton',
  templateUrl: './bouton.component.html',
  styleUrls: ['./bouton.component.css']
})
export class BoutonComponent implements OnInit {
  @Input()
  label: string;
  @Input()
  padding: any;
  @Input()
  selected: boolean;
  @Input()
  disabled: boolean;
  @Input()
  width: any;
  @Input()
  height: any;
  @Input()
  onClick2: Function;

  onButtonClick(): void {
    if(this.onClick2) {
      this.onClick2();
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
