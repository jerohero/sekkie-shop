import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Item } from './models/item.model';
import {ItemService} from './services/item.service';
import {Observable, pipe, throwError} from 'rxjs';
import {User} from './models/user.model';
import {catchError, tap} from 'rxjs/operators';
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
    return this.genericAccessService.sendPOST<AuthResponseData>('auth/register', body, false);
  }

  loginUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.genericAccessService.sendPOST<AuthResponseData>('auth/authenticate', body, false);
  }

  updateUser(user: User) {
    const body = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      role: user.role,
      address: user.address,
      token: user.token
    };
    console.log(body);
    return this.genericAccessService.sendPUT<any>('auth/profile', body, true);
  }
}
