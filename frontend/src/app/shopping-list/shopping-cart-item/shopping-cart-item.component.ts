import { Component, Input, OnInit } from '@angular/core';

import { ShoppingCartItem } from '../../shared/models/shopping-cart-item.model';
import {ShoppingListService} from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() item: ShoppingCartItem;
  showRemove: boolean;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  removeItem(): void {
    this.shoppingListService.removeItem(this.item);
  }

  plusAmount(): void {
    this.item.selectedAmount++;
    this.shoppingListService.updateLocalStorageCart();
  }

  minusAmount(): void {
    if (this.item.selectedAmount >= 2) {
      this.item.selectedAmount--;
      this.shoppingListService.updateLocalStorageCart();
    }
  }

}
