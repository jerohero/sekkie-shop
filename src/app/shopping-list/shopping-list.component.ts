import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import {Item} from '../home/item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: Item[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.slService.getItems();
    this.slService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      );
  }
}
