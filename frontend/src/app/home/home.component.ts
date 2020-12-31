import {Component, HostListener, OnInit} from '@angular/core';

import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ItemService]
})
export class HomeComponent implements OnInit {
  public spt: any;
  public spl: any;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

}
