import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/models/order.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

}
