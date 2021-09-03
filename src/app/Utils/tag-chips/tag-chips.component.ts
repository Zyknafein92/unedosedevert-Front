import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tag} from '../../../model/tag.model';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.css']
})
export class TagChipsComponent implements OnInit, OnChanges {

  @Input()
  tags: Array<Tag>;
  @Input()
  onClick: Function;

  tagMap: Map<String, Boolean> = new Map<String, Boolean>();

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tags) {
      let tags = changes.tags.currentValue || [];
      tags.forEach(tag => this.tagMap.set(tag.name, false));
    }
  }

  selectChip(tag: String) {
    this.onClick(tag);
    this.tags.forEach(tag => this.tagMap.set(tag.name, false));
    this.tagMap.set(tag, true)
  }
}
