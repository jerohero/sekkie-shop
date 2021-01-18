import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AuthService} from './login/auth.service';
import {Subscription} from 'rxjs';

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
