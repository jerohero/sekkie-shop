import {Injectable} from '@angular/core';

import {Item} from '../models/item.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemService {
  itemsChanged = new Subject<Item[]>();
  categories: string[] = ['outerwear', 'tops', 'pants', 'accessories'];
  collections: string[] = ['f/w 20', 's/s 21'];

  private items: Item[] = [];

  constructor(private slService: ShoppingListService) { }

  setItems(items: Item[]) {
    this.items = items;
    this.itemsChanged.next(items);
  }

  getItems() {
    return this.items.slice();
  }

  getItem(id: string) {
    console.log(this.items);
    return this.items.find(i => i.id === id);
  }

  addItemToShoppingList(item: Item, {selectedSize, selectedColor}) {
    this.slService.addItem(item, {selectedSize, selectedColor});
  }
}
