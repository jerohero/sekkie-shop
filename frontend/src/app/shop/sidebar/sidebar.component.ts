import {Component, OnInit, ViewChild} from '@angular/core';
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
  activeCategory: string;
  @ViewChild('search') search: SearchComponent;

  constructor(private itemService: ItemService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.categories.unshift('all');
  }

  setActiveCategory(category: string) {
    if (category === 'all') {
      category = '';
    }
    this.activeCategory = category;
    this.shopService.activeCategory.next(category);
    this.search.search();
  }

}
