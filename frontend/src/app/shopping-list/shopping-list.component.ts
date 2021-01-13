import {Component, OnDestroy, OnInit} from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-item.model';
import {ShopService} from '../shop/shop.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingCartItems: ShoppingCartItem[];
  private itemsChangedSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingCartItems = this.slService.getItems();
    this.itemsChangedSub = this.slService.shoppingCartChanged
      .subscribe(
        (items: ShoppingCartItem[]) => {
          this.shoppingCartItems = items;
        }
      );
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
