import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../shared/services/item.service';
import {ShopService} from '../../shop.service';
import {Item} from '../../../shared/models/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string;

  constructor(private itemService: ItemService, private shopService: ShopService) { }

  ngOnInit(): void {
  }

  search(value): void {
    let results: Item[];
    results = this.itemService.getItems().filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    this.shopService.itemsFiltered.next(results);
  }

}
