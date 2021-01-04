import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import {ItemService} from './item.service';

@Injectable({providedIn: 'root'})
export class DataAccessService {
  constructor(private http: HttpClient, private itemService: ItemService) { }

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
