import {Component, OnDestroy, OnInit} from '@angular/core';

import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../shared/models/shopping-cart-item.model';
import {OrderService} from '../shared/services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingCartItems: ShoppingCartItem[];
  private itemsChangedSub: Subscription;

  constructor(private slService: ShoppingListService, private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.shoppingCartItems = this.slService.getItems();
    this.itemsChangedSub = this.slService.shoppingCartChanged
      .subscribe(
        (items: ShoppingCartItem[]) => {
          this.shoppingCartItems = items;
        }
      );
  }

  checkout() {
    if (this.shoppingCartItems.length < 1) {
      alert('Please fill your shopping cart before placing an order.');
      return;
    }
    this.orderService.shoppingCartItems = this.shoppingCartItems;
    this.router.navigate(['/order']);
  }

  calculateTotalPrice(): number {
    let total = 0;
    this.slService.getItems().forEach((item) => {
      total = total + item.price * item.selectedAmount;
    });
    return total;
  }

  ngOnDestroy(): void {
    this.itemsChangedSub.unsubscribe();
  }
}
