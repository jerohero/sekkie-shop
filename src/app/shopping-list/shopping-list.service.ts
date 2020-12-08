import { EventEmitter } from '@angular/core';
import {Item} from '../items/item.model';

export class ShoppingListService {
  itemsChanged = new EventEmitter<Item[]>();
  private items: Item[] = [
  ];

  getItems() {
    return this.items.slice();
  }

  addItem(item: Item) {
    this.items.push(item);
    this.itemsChanged.emit(this.items.slice());
  }
}
