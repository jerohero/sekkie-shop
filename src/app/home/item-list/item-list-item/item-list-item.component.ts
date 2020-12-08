import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../item.model';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.scss']
})
export class ItemListItemComponent implements OnInit {
  @Input() item: Item;
  @Input() index: number;

  ngOnInit() {
  }
}
