import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import {User} from './models/user.model';
import {GenericAccessService} from './generic-access.service';
import {Order} from './models/order.model';

export interface AuthResponseData {
  token: string;
  user: User;
}

@Injectable({providedIn: 'root'})
export class UserAccessService {
  constructor(private http: HttpClient, private genericAccessService: GenericAccessService) { }

  registerUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.genericAccessService.sendPOST<AuthResponseData>('users/register', body, false);
  }

  loginUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.genericAccessService.sendPOST<AuthResponseData>('users/authenticate', body, false);
  }

  updateUserDetails(user: User) {
    const body = {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address
    };
    return this.genericAccessService.sendPUT<any>('users/profile', body, true);
  }

  updateUserRole(user: User): Observable<User> {
    const body = { user };
    return this.genericAccessService.sendUserSpecificPUT<User>('users/', body);
  }

  fetchUsers(): Observable<User[]> {
    return this.genericAccessService.sendUserSpecificGET<User[]>('users/');
  }

  verifyUser(): Observable<any> {
    return this.genericAccessService.sendGET<User>('users/profile/', true);
  }
}
