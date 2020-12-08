import {Component, HostListener, OnInit} from '@angular/core';

import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [ItemService]
})
export class ItemsComponent implements OnInit {
  selectedItem: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.itemSelected
      .subscribe(
        (item: Item) => {
          this.selectedItem = item;
        }
      );
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

}
