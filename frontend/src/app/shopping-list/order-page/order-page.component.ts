import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {User} from '../../shared/models/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  user: User;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    if (this.dataStorageService.user) {
      this.user = this.dataStorageService.user.getValue();
    }
  }

  onContinue(accountInfoForm: NgForm) {

  }
}
