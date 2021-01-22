import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from '../../shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input() orders: Order[];
  selectedOrder: Order;

  constructor() { }

  ngOnInit(): void {
    if (this.orders) {
      this.selectedOrder = this.orders[0];
    }
  }

  showOrder(order: Order): void {
    this.selectedOrder = order;
  }
}
