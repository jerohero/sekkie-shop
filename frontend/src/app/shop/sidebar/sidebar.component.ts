import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../shared/services/item.service';
import {ShopService} from '../shop.service';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: string[] = this.itemService.categories;
  collections: string[] = this.itemService.collections;
  activeCategory = '';
  activeCollection = '';
  @ViewChild('search') search: SearchComponent;

  constructor(private itemService: ItemService, private shopService: ShopService) { }

  ngOnInit(): void {
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.shopService.activeCategory.next(category);
    this.search.search();
  }

  setActiveCollection(collection: string): void {
    this.activeCollection = collection;
    this.shopService.activeCollection.next(collection);
    this.search.search();
  }
}
