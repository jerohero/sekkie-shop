import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import {ItemService} from './item.service';
import {Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserAccessService {
  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>('http://localhost:3000/auth/register', body)
      .pipe(catchError(error => {
        let errorMsg = 'An unknown error has occurred';
        if (!error.error) {
          return throwError(errorMsg);
        }
        switch (error.error.message) {
          case 'EMAIL_IN_USE':
            errorMsg = 'This email address is already in use. Please try another email address.'
        }
        return throwError(errorMsg);
      }));
  }
}
