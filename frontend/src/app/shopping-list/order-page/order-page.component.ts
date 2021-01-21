import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {User} from '../../shared/models/user.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../login/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription = new Subscription();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.dataStorageService.user.getValue()) {
      this.user = this.dataStorageService.user.getValue();
    } else {
      this.user = new User(null, null, null, null, null, null);

      // In case user logs in while checking out
      this.userSub = this.dataStorageService.user
        .subscribe((user) => {
          console.log(user);
          this.user = user;
        });
    }
  }

  onContinue(accountInfoForm: NgForm) {

  }

  showLogin() {
    this.authService.showLogin.next(true);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
