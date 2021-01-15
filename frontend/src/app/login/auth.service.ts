import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../shared/user.model';
import {ItemAccessService} from '../shared/item-access.service';
import {UserAccessService} from '../shared/user-access.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private userAccessService: UserAccessService) {
  }

  signup(email: string, password: string): Observable<User> {
    return this.userAccessService.registerUser(email, password);
  }

// {
//   "email": "test@gmail.com",
//   "password": "1234",
//   "name": "Geert"
// }
}
