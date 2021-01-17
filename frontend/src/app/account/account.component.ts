import { Component, OnInit } from '@angular/core';
import {AuthService} from '../login/auth.service';
import {skipWhile, take} from 'rxjs/operators';
import {User, UserAddress} from '../shared/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;
  address: UserAddress;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(user => {
        console.log(user);
        this.user = user;
        this.address = this.user.address;
      });
  }

  onUpdateAccountInfo(form: NgForm): void {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    this.address.streetAndHouseNumber = form.value.streetAndHouseNumber;
    this.address.city = form.value.city;
    this.address.country = form.value.country;
    this.address.postalCode = form.value.postalCode;

    this.user.address = this.address;
    this.user.firstName = firstName;
    this.user.lastName = lastName;

    console.log(this.user);
  }

}
