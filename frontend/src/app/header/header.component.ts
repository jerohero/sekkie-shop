import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ShoppingListService} from '../shared/services/shopping-list.service';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/models/user.model';
import {DataStorageService} from '../shared/services/data-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  shoppingCartSize: number;
  userSub = new Subscription();
  user: User;

  constructor(private slService: ShoppingListService, private dataStorageService: DataStorageService,
              private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.shoppingCartSize = this.slService.getItems().length;
    this.slService.shoppingCartChanged.subscribe(data =>  {
      this.shoppingCartSize = data.length;
    });

    this.userSub = this.dataStorageService.user
      .subscribe((user) => {
        this.user = user;
      });
  }

  onLoginClicked(): void {
    this.authService.showLogin.next(true);
  }

  onLogoutClicked(): void {
    this.router.navigate(['/']).then(() => {
      this.authService.logout();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
