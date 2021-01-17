import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Item } from './models/item.model';
import {ItemService} from './services/item.service';
import {AuthService} from '../login/auth.service';
import {exhaustMap, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ItemAccessService {
  constructor(private http: HttpClient, private itemService: ItemService, private authService: AuthService) { }

  fetchItems() {
    return this.http
      .get<Item[]>('http://localhost:3000/items')
      .subscribe(items => {
        this.itemService.setItems(items);
      });
  }

  fetchItem(id: string) {
    return this.http
      .get<Item>('http://localhost:3000/items/' + id);
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
