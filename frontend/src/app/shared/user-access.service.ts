import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Item } from './item.model';
import {ItemService} from './item.service';
import {Observable, pipe, throwError} from 'rxjs';
import {User} from './user.model';
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
}
