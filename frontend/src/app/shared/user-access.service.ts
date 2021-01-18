import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Item } from './models/item.model';
import {ItemService} from './services/item.service';
import {Observable, pipe, throwError} from 'rxjs';
import {User} from './models/user.model';
import {catchError, tap} from 'rxjs/operators';

export interface AuthResponseData {
  token: string;
  user: User;
}

@Injectable({providedIn: 'root'})
export class UserAccessService {
  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.http.post<AuthResponseData>('http://localhost:3000/auth/register', body);
  }

  loginUser(email: string, password: string): Observable<AuthResponseData> {
    const body = { email, password };
    return this.http.post<AuthResponseData>('http://localhost:3000/auth/authenticate', body);
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
    return this.http.put('http://localhost:3000/auth/profile', body);
  }
}
