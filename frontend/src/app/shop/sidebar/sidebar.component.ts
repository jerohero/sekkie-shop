import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../shared/services/item.service';
import {ShopService} from '../../shared/services/shop.service';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('search') search: SearchComponent;
  categories: string[] = this.itemService.categories;
  collections: string[] = this.itemService.collections;
  activeCategory = '';
  activeCollection = '';

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
