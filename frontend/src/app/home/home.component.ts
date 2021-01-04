import {Component, HostListener, OnInit} from '@angular/core';

import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';
import {DataAccessService} from '../shared/data-access.service';

@Component({
  selector: 'app-items',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public spt: any;
  public spl: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

}
