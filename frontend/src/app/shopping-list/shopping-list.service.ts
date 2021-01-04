import { Injectable } from '@angular/core';

import { Item } from '../shared/item.model';
import { Subject } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-item.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  shoppingCartChanged = new Subject<ShoppingCartItem[]>();
  private shoppingCartItems: ShoppingCartItem[] = [];

  getItems() {
    return this.shoppingCartItems.slice();
  }

  addItem(item: Item, {selectedSize, selectedColor}) {
    const shoppingCartItem = new ShoppingCartItem(
      item.id,
      item.name,
      item.price,
      item.price,
      item.primaryImagePath,
      selectedSize,
      selectedColor,
      1);
    this.shoppingCartItems.push(shoppingCartItem);
    this.shoppingCartChanged.next(this.shoppingCartItems.slice());
  }
}
