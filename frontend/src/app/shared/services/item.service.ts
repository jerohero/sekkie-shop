import {Injectable} from '@angular/core';
import {Item} from '../models/item.model';
import {ShoppingListService} from './shopping-list.service';

@Injectable({providedIn: 'root'})
export class ItemService {
  categories: string[] = ['outerwear', 'tops', 'pants', 'accessories'];
  collections: string[] = ['f/w 20', 's/s 21'];

  private items: Item[] = [];

  constructor(private slService: ShoppingListService) { }

  setItems(items: Item[]) {
    this.items = items;
  }

  getItems() {
    return this.items.slice();
  }

  addItemToShoppingList(item: Item, {selectedSize, selectedColor}) {
    this.slService.addItem(item, {selectedSize, selectedColor});
  }
}
