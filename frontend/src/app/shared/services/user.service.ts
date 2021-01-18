import {Injectable} from '@angular/core';
import {UserAccessService} from '../user-access.service';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private userAccessService: UserAccessService) {}

  updateUser(user: User) {
    this.userAccessService.updateUser(user).subscribe();
  }
}
