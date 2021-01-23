import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor() { }

  ngOnInit(): void {
  }

  deleteUser() {

  }

  showUser(user: User) {

  }

  updateUserRole() {

  }
}
