import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {User} from '../../shared/models/user.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../login/auth.service';
import {Subscription} from 'rxjs';
import {ShoppingCartItem} from '../shopping-cart-item.model';
import {OrderService} from './order.service';
import {Order} from '../../shared/models/order.model';
import {DatePipe} from '@angular/common';

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
              private orderService: OrderService, private datePipe: DatePipe) { }

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
    this.orderItems = this.orderService.shoppingCartItems;
  }

  onContinue(accountInfoForm: NgForm) {
    if (!accountInfoForm.valid) {
      alert('Not valid');
      return;
    }

    this.createOrder();
  }

  createOrder(): void {
    let totalPrice = 0;
    this.orderItems.forEach((item) => {
      totalPrice = totalPrice + item.price;
    });

    this.order = new Order(
      null, this.user.id, this.orderItems, this.user.name, this.user.email, this.user.address, totalPrice, Date.now(), 'On Hold'
    );

    console.log(this.order);
  }

  showLogin() {
    this.authService.showLogin.next(true);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
