import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Item} from '../shared/item.model';

@Injectable({providedIn: 'root'})
export class ShopService {
  itemsFiltered = new Subject<Item[]>();

  constructor() {
  }


}
