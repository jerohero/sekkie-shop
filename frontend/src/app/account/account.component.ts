import {Component, OnInit} from '@angular/core';
import {skipWhile, take} from 'rxjs/operators';
import {User, UserAddress, UserName} from '../shared/models/user.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {DataStorageService} from '../shared/services/data-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private accountService: UserService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(user => {
        console.log(user);
        this.user = user;
      });
  }

  onUpdateAccountInfo(form: NgForm): void {
    this.user.name = {
      firstName: form.value.firstName,
      lastName: form.value.lastName
    };
    this.user.address = {
      streetAndHouseNumber: form.value.streetAndHouseNumber,
      city: form.value.city,
      country: form.value.country,
      postalCode: form.value.postalCode,
    };

    this.accountService.updateUser(this.user);
  }

}
