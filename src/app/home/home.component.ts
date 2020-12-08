import {Component, HostListener, OnInit} from '@angular/core';

import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ItemService]
})
export class HomeComponent implements OnInit {
  selectedItem: Item;
  public spt: any;
  public spl: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.itemSelected
      .subscribe(
        (item: Item) => {
          this.selectedItem = item;
        }
      );
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

}
