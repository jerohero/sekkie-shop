import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
