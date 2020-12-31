import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {ItemService} from '../../shared/item.service';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() item: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

}
