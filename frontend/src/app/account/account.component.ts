import { Component, OnInit } from '@angular/core';
import {AuthService} from '../login/auth.service';
import {skipWhile, take} from 'rxjs/operators';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(user => {
        console.log(user);
        this.user = user;
      });
  }

}
