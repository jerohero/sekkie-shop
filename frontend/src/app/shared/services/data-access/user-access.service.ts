import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {GenericAccessService} from './generic-access.service';

export interface AuthResponseData {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({providedIn: 'root'})
export class UserAccessService {
  constructor(private http: HttpClient, private genericAccessService: GenericAccessService) { }

  registerUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.genericAccessService.sendPOST<AuthResponseData>('users/register', body);
  }

  loginUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.genericAccessService.sendPOST<AuthResponseData>('users/authenticate', body);
  }

  updateUserDetails(user: User) {
    const body = {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address
    };
    return this.genericAccessService.sendPUT<any>('users/profile', body);
  }

  updateUserRole(user: User): Observable<User> {
    const body = { user };
    return this.genericAccessService.sendUserSpecificPUT<User>('users/', body);
  }

  fetchUsers(): Observable<User[]> {
    return this.genericAccessService.sendUserSpecificGET<User[]>('users/');
  }

  deleteUser(userId: string): Observable<any> {
    return this.genericAccessService.sendUserSpecificDELETE<any>('users/' + userId);
  }

  verifyUser(): Observable<AuthResponseData> {
    return this.genericAccessService.sendGET<AuthResponseData>('users/profile/');
  }

  logOut(): Observable<void> {
    return this.genericAccessService.sendDELETE<void>('users/logout/');
  }
}
