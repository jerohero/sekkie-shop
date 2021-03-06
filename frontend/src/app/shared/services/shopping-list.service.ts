import {Inject, Injectable} from '@angular/core';

import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';

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

  updateLocalStorageCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.shoppingCartItems));
  }

  getItems() {
    return this.shoppingCartItems.slice();
  }

  setItems(items): void {
    this.shoppingCartItems = items;
    this.shoppingCartChanged.next(this.shoppingCartItems.slice());
  }

  removeItem(item): void {
    this.shoppingCartItems.splice(this.shoppingCartItems.indexOf(item), 1);
    this.shoppingCartChanged.next(this.shoppingCartItems.slice());
    this.updateLocalStorageCart();
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
    this.updateLocalStorageCart();
  }
}
