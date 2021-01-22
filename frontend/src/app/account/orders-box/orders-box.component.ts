import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';

@Component({
  selector: 'app-orders-box',
  templateUrl: './orders-box.component.html',
  styleUrls: ['./orders-box.component.scss']
})
export class OrdersBoxComponent implements OnInit {
  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

}
