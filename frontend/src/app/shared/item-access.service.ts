import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Item } from './models/item.model';
import {ItemService} from './services/item.service';
import {AuthService} from '../login/auth.service';
import {GenericAccessService} from './generic-access.service';

@Injectable({providedIn: 'root'})
export class ItemAccessService {
  constructor(
    private http: HttpClient, private itemService: ItemService,
    private authService: AuthService, private genericAccessService: GenericAccessService) { }

  fetchItems() {
    return this.genericAccessService.sendGET<Item[]>('items/', false)
      .subscribe(items => {
        this.itemService.setItems(items);
      });
  }

  fetchItem(id: string) {
    return this.genericAccessService.sendGET<Item>('items/' + id, false);
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
