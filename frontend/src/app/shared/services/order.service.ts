import {Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/shopping-cart-item.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  shoppingCartItems: ShoppingCartItem[];

  constructor() {
  }


}
