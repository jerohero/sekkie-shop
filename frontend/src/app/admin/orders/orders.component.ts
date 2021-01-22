import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {OrderAccessService} from '../../shared/order-access.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  selectedOrder: Order;

  constructor(private orderAccessService: OrderAccessService) { }

  ngOnInit(): void {
    this.orderAccessService.fetchOrders()
      .subscribe((orders) => {
        this.orders = orders;
        this.selectedOrder = this.orders[0];
      });
  }

  showOrder(order: Order): void {
    this.selectedOrder = order;
  }

  deleteOrder(): void {
    this.orderAccessService.deleteOrder(this.selectedOrder)
      .subscribe(() => {
        const index = this.orders.indexOf(this.selectedOrder, 0);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
        this.selectedOrder = null;
      });
  }

  updateOrderStatus() {
    if (this.orderStatusButtonTxt === 'ship') {
      this.selectedOrder.status = 'SHIPPING';
    } else {
      this.selectedOrder.status = 'ON_HOLD';
    }
    this.orderAccessService.updateOrder(this.selectedOrder)
      .subscribe();
  }

  get orderStatusButtonTxt() {
    if (this.selectedOrder.status === 'ON_HOLD') {
      return 'ship';
    } else {
      return 'cancel';
    }
  }
}
