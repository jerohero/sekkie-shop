import {Inject, Injectable} from '@angular/core';

import { Item } from '../shared/item.model';
import { Subject } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-item.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  shoppingCartChanged = new Subject<ShoppingCartItem[]>();
  private shoppingCartItems: ShoppingCartItem[] = [];

  fetchLocalStorageCart(): void {
    const localStorageItems = localStorage.getItem('cart');
    if (localStorageItems) {
      this.setItems(JSON.parse(localStorageItems));
    }
  }

  getItems() {
    return this.shoppingCartItems.slice();
  }

  setItems(items): void {
    this.shoppingCartItems = items;
    this.shoppingCartChanged.next(this.shoppingCartItems.slice());
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
    localStorage.setItem('cart', JSON.stringify(this.shoppingCartItems));
  }
}
