import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {OrderAccessService} from '../../shared/services/data-access/order-access.service';
import {skipWhile, take} from 'rxjs/operators';
import {DataStorageService} from '../../shared/services/data-storage.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  selectedOrder: Order;

  constructor(private orderAccessService: OrderAccessService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(() => {
        this.orderAccessService.fetchOrders()
          .subscribe((orders) => {
            this.orders = orders;
            this.selectedOrder = this.orders[0];
          });
      });
  }

  showOrder(order: Order): void {
    this.selectedOrder = order;
  }

  deleteOrder(): void {
    this.orderAccessService.deleteOrder(this.selectedOrder.id)
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
    this.orderAccessService.updateOrder(this.selectedOrder).subscribe();
  }

  get orderStatusButtonTxt() {
    if (this.selectedOrder.status === 'ON_HOLD') {
      return 'ship';
    } else {
      return 'cancel';
    }
  }
}
