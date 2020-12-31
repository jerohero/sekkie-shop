import {Component, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {ItemService} from '../../shared/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataAccessService} from '../../shared/data-access.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.dataAccessService.fetchItems().subscribe(items => {
      this.itemService.setItems(items);
    });

    this.itemService.itemsChanged
      .subscribe((items) => {
        this.items = items;
      });

    this.items = this.itemService.getItems();
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
