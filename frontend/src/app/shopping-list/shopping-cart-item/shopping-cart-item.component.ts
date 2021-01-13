import { Component, Input, OnInit } from '@angular/core';

import { ShoppingCartItem } from '../shopping-cart-item.model';
import {ShoppingListService} from '../shopping-list.service';

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

}
