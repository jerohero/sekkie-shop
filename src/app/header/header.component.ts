import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  shoppingCartSize: number;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingCartSize = this.slService.getItems().length;
    this.slService.itemsChanged.subscribe(data =>  {
      this.shoppingCartSize = data.length;
    });
  }
}
