import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserAccessService} from '../../shared/user-access.service';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {skipWhile, take} from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(private userAccessService: UserAccessService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.user.pipe(skipWhile(user => !user), take(1))
      .subscribe(() => {
        this.userAccessService.fetchUsers()
          .subscribe((users) => {
            this.users = users;
            this.selectedUser = this.users[0];
          });
      });
  }

  deleteUser(): void {
    this.userAccessService.deleteUser(this.selectedUser.id)
      .subscribe(() => {
        const index = this.users.indexOf(this.selectedUser, 0);
        if (index > -1) {
          this.users.splice(index, 1);
        }
        this.selectedUser = null;
      });
  }

  showUser(user: User): void {
    this.selectedUser = user;
  }

  updateUserRole(): void {
    if (this.selectedUser.id === this.dataStorageService.user.getValue().id) {
      return alert('You can\'t demote yourself!');
    }
    if (this.userRoleButtonTxt === 'promote') {
      this.selectedUser.role = 'ROLE_ADMIN';
    } else {
      this.selectedUser.role = 'ROLE_USER';
    }
    this.userAccessService.updateUserRole(this.selectedUser)
      .subscribe((user) => {
        console.log(user);
      });
  }

  get userRoleButtonTxt() {
    if (this.selectedUser.role === 'ROLE_USER') {
      return 'promote';
    } else {
      return 'demote';
    }
  }
}
