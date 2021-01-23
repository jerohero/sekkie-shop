import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import {User} from './models/user.model';
import {GenericAccessService} from './generic-access.service';

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

  updateUser(user: User) {
    const body = {
      email: user.email,
      name: user.name,
      id: user.id,
      role: user.role,
      address: user.address,
      token: user.token
    };
    return this.genericAccessService.sendPUT<any>('users/profile', body, true);
  }

  fetchUsers(): Observable<User[]> {
    return this.genericAccessService.sendUserSpecificGET<User[]>('users/');
  }
}
