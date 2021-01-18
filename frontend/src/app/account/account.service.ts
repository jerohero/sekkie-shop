import {Injectable} from '@angular/core';
import {UserAccessService} from '../shared/user-access.service';
import {User} from '../shared/models/user.model';

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(private userAccessService: UserAccessService) {}

  updateUser(user: User) {
    this.userAccessService.updateUser(user).subscribe();
  }
}
