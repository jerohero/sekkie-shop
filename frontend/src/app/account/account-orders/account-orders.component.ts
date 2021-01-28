import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';

@Component({
  selector: 'app-orders-box',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {
  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

}
