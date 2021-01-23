import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserAccessService} from '../../shared/user-access.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(private userAccessService: UserAccessService) { }

  ngOnInit(): void {
    this.userAccessService.fetchUsers()
      .subscribe((users) => {
        console.log(users);
      });
  }

  deleteUser() {

  }

  showUser(user: User) {

  }

  updateUserRole() {
  }
}
