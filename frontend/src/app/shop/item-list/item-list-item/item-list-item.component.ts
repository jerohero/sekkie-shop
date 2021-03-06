import {Component, OnInit, Input, Output} from '@angular/core';
import { Item } from '../../../shared/models/item.model';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.scss']
})
export class ItemListItemComponent implements OnInit {
  @Output() shownImagePath: string;
  @Input() item: Item;

  ngOnInit() {
    this.shownImagePath = this.item.primaryImagePath;
  }

  toggleImage() {
    this.shownImagePath =
      this.shownImagePath === this.item.primaryImagePath ? this.item.secondaryImagePaths[0] : this.item.primaryImagePath;
  }
}
