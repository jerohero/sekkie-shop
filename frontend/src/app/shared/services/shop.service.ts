import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Item} from '../models/item.model';

@Injectable({providedIn: 'root'})
export class ShopService {
  itemsFiltered = new BehaviorSubject<Item[]>([]);

  constructor() {
  }


}
