import {Component, OnInit, Input, Output} from '@angular/core';

import { Item } from '../../../shared/item.model';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.scss']
})
export class ItemListItemComponent implements OnInit {
  @Input() item: Item;
  @Input() index: number;
  @Output() shownImagePath: string;

  ngOnInit() {
    this.shownImagePath = this.item.primaryImagePath;
  }

  toggleImage() {
    this.shownImagePath =
      this.shownImagePath === this.item.primaryImagePath ? this.item.secondaryImagePaths[1] : this.item.primaryImagePath;
  }
}
