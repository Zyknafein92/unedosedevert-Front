import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.css']
})
export class TagChipsComponent implements OnInit {

  @Input()
  label: string;
  @Input()
  selected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
