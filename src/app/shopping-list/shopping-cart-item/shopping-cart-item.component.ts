import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../home/item.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
