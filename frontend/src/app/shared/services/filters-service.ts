import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../models/item.model';

@Injectable({providedIn: 'root'})
export class FiltersService {
  activeCategory = '';
  activeCollection = '';
  searchValue = new BehaviorSubject<string>('');
  itemsFiltered = new BehaviorSubject<Item[]>([]);

  constructor() {
  }


}
