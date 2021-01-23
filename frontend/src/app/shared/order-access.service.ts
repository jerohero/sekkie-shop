import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemService} from './services/item.service';
import {AuthService} from '../login/auth.service';
import {GenericAccessService} from './generic-access.service';
import {Order} from './models/order.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrderAccessService {
  constructor(
    private http: HttpClient, private itemService: ItemService,
    private authService: AuthService, private genericAccessService: GenericAccessService
  ) { }

  createOrder(order: Order): Observable<Order> {
    const body = { order };
    return this.genericAccessService.sendPOST<Order>('admin-orders/', body, false);
  }

  deleteOrder(order: Order): Observable<Order> {
    const body = { order };
    return this.genericAccessService.sendUserSpecificDELETE<Order>('admin-orders/', body);
  }

  updateOrder(order: Order): Observable<Order> {
    const body = { order };
    return this.genericAccessService.sendUserSpecificPUT<Order>('admin-orders/', body);
  }

  fetchOrders(): Observable<Order[]> {
    return this.genericAccessService.sendUserSpecificGET<Order[]>('admin-orders/');
  }

  fetchOrdersByUserId(userId: string): Observable<Order[]> {
    return this.genericAccessService.sendGET<Order[]>('admin-orders/' + userId, true);
  }
}
