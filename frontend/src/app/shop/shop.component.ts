import {Component, HostListener, OnInit} from '@angular/core';

import { Item } from '../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';
import {ItemAccessService} from '../shared/item-access.service';

@Component({
  selector: 'app-items',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public spt: any;
  public spl: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event) {
  //   event.preventDefault();
  // }

}
