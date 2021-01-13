import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedFeature = 'item';
  showLogin: boolean;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingListService.fetchLocalStorageCart();
  }

  onNavigate(feature: string): void {
    this.loadedFeature = feature;
  }

  onLoginClicked(): void {
    this.showLogin = true;
  }

  onLoginClosed(): void {
    this.showLogin = false;
  }
}
