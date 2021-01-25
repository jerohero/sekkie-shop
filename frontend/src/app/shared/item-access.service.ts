import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Item } from './models/item.model';
import {ItemService} from './services/item.service';
import {AuthService} from '../login/auth.service';
import {GenericAccessService} from './generic-access.service';
import {Observable} from 'rxjs';
import {Order} from './models/order.model';

@Injectable({providedIn: 'root'})
export class ItemAccessService {
  constructor(
    private http: HttpClient, private itemService: ItemService,
    private authService: AuthService, private genericAccessService: GenericAccessService) { }

  fetchItems() {
    return this.genericAccessService.sendGET<Item[]>('items/', false);
  }

  fetchItem(id: string) {
    return this.genericAccessService.sendGET<Item>('items/' + id, false);
  }

  deleteItem(itemId: string): Observable<Order> {
    return this.genericAccessService.sendUserSpecificDELETE<Order>('items/' + itemId);
  }

  updateItem(item: Item): Observable<Item> {
    const body = { item };
    return this.genericAccessService.sendUserSpecificPUT<Item>('items/' + item.id, body);
  }
}

// this.authService.user.pipe(take(1), exhaustMap(user => {
//   return this.http
//     .get<Item[]>('http://localhost:3000/items', {
//       params: new HttpParams().set('auth', user.token)
//     });
// }), tap((items) => {
//   this.itemService.setItems(items);
// }));
