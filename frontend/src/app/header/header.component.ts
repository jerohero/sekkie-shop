import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  shoppingCartSize: number;
  @Output() loginClick = new EventEmitter<void>();

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingCartSize = this.slService.getItems().length;
    this.slService.shoppingCartChanged.subscribe(data =>  {
      this.shoppingCartSize = data.length;
    });
  }

  onLoginClicked(): void {
    this.loginClick.emit();
  }
}
