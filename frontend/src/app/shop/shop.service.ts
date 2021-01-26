import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Item} from '../shared/models/item.model';

@Injectable({providedIn: 'root'})
export class ShopService {
  itemsFiltered = new BehaviorSubject<Item[]>([]);
  activeCategory = new BehaviorSubject<string>('');
  activeCollection = new BehaviorSubject<string>('');


  constructor() {
  }


}
