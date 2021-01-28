import {Component, OnInit} from '@angular/core';
import {skipWhile, take} from 'rxjs/operators';
import {User} from '../shared/models/user.model';
import {NgForm} from '@angular/forms';
import {DataStorageService} from '../shared/services/data-storage.service';
import {OrderAccessService} from '../shared/services/data-access/order-access.service';
import {Order} from '../shared/models/order.model';
import {UserAccessService} from '../shared/services/data-access/user-access.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;
  orders: Order[];

  constructor(
    private dataStorageService: DataStorageService,
    private orderAccessService: OrderAccessService, private userAccessService: UserAccessService
  ) { }

  ngOnInit(): void {
    this.dataStorageService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(user => {
        this.user = user;
        this.orderAccessService.fetchOrdersByUserId(user.id)
          .subscribe((orders) => {
            this.orders = orders;
          });
      });
  }

  onUpdateAccountInfo(form: NgForm): void {
    this.user.name = {
      firstName: form.value.firstName,
      lastName: form.value.lastName
    };
    this.user.address = {
      streetAndHouseNumber: form.value.streetAndHouseNumber,
      city: form.value.city,
      country: form.value.country,
      postalCode: form.value.postalCode,
    };

    this.userAccessService.updateUserDetails(this.user).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.dataStorageService.user.next(res.user);
    });
  }

}
