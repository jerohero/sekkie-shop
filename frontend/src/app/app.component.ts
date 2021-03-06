import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shared/services/shopping-list.service';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedFeature = 'item';
  showLogin: boolean;

  constructor(private shoppingListService: ShoppingListService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.shoppingListService.fetchLocalStorageCart();
    this.authService.autoLogin();
    this.authService.showLogin
      .subscribe((showLogin) => {
        this.showLogin = showLogin;
      });
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
