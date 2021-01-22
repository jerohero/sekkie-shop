import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from '../shared/models/order.model';
import {OrderAccessService} from '../shared/order-access.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor(private orderAccessService: OrderAccessService) { }

  ngOnInit(): void {
    this.orderAccessService.fetchOrders()
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

}
