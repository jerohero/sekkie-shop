import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class DataAccessService {
  constructor(private http: HttpClient) { }

  fetchItems() {
    return this.http
      .get<Item[]>('http://localhost:3000/items');
  }
}
