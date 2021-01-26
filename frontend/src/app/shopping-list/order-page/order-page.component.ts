import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {User, UserAddress, UserName} from '../../shared/models/user.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ShoppingCartItem} from '../../shared/models/shopping-cart-item.model';
import {OrderService} from '../../shared/services/order.service';
import {Order} from '../../shared/models/order.model';
import {DatePipe} from '@angular/common';
import {OrderAccessService} from '../../shared/services/data-access/order-access.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [DatePipe]
})
export class OrderPageComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription = new Subscription();
  orderItems: ShoppingCartItem[];
  order: Order;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService,
              private orderService: OrderService, private datePipe: DatePipe, private orderAccessService: OrderAccessService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.dataStorageService.user.getValue()) {
      this.user = this.dataStorageService.user.getValue();
    } else {
      const emptyName: UserName = {
        firstName: null,
        lastName: null
      };
      const emptyAddress: UserAddress = {
        streetAndHouseNumber: null,
        postalCode: null,
        city: null,
        country: null
      };
      this.user = new User(null, null, emptyName, null, emptyAddress, null);
      // In case user logs in while checking out
      this.userSub = this.dataStorageService.user
        .subscribe((user) => {
          if (user) {
            this.user = user;
          }
        });
    }

    this.orderItems = this.orderService.shoppingCartItems;
  }

  createOrder(form: NgForm): void {
    if (!form.valid) {
      alert('The form is not valid.');
      return;
    }

    // Retrieve form values
    this.user.email = form.value.email;
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

    let totalPrice = 0;
    this.orderItems.forEach((item) => {
      totalPrice = totalPrice + item.totalPrice;
    });

    let userId;
    if (this.dataStorageService.user.getValue()) {
      userId = this.user.id;
    } else {
      userId = null;
    }
    this.order = new Order(
      null, userId, this.orderItems, this.user.name, this.user.email, this.user.address, totalPrice, Date.now(), 'ON_HOLD'
    );

    this.orderAccessService.createOrder(this.order)
      .subscribe((newOrder) => {
        if (newOrder) {
          this.router.navigate(['/shipping']);
        }
      });
  }

  showLogin() {
    this.authService.showLogin.next(true);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
