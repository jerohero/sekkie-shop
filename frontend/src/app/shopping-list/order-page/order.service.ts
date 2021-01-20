import {Injectable} from '@angular/core';
import {ShoppingCartItem} from '../shopping-cart-item.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  shoppingCartItems: ShoppingCartItem[];

  constructor() {
  }
}
