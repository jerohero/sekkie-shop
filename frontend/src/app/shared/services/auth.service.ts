import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User, UserAddress, UserName} from '../models/user.model';
import {AuthResponseData, UserAccessService} from './data-access/user-access.service';
import {catchError, tap} from 'rxjs/operators';
import {DataStorageService} from './data-storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  showLogin = new Subject<boolean>();

  constructor(private http: HttpClient, private userAccessService: UserAccessService, private dataStorageService: DataStorageService) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.registerUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.token);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.loginUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        console.log(resData);
        this.handleAuthentication(resData.token);
      }));
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.handleAuthentication(token);
  }

  logout(): void {
    this.dataStorageService.user.next(null);
    localStorage.removeItem('token');
  }

  handleAuthentication(token: string) {
    // const expirationDate = new Date(
    //   new Date().getTime() + +expiresIn * 1000
    // );

    localStorage.setItem('token', token);
    this.userAccessService.verifyUser()
      .subscribe((res) => {
        console.log(res);
        const user = new User(
          res.data.id,
          res.data.email,
          res.data.name,
          res.data.role,
          res.data.address,
          token
        );
        this.dataStorageService.user.next(user);
      });
  }

  handleError(errorRes: HttpErrorResponse): Observable<any> {
    let errorMsg = 'An unknown error has occurred.';
    if (!errorRes.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.message) {
      case 'EMAIL_IN_USE':
        errorMsg = 'This email address is already in use. Please try another email address.';
        break;
      case 'NO_EMAIL':
        errorMsg = 'You did not enter an email address. Please enter an email address.';
        break;
      case 'NO_PASSWORD':
        errorMsg = 'You did not enter a password. Please enter a password.';
        break;
      case 'NO_MATCH':
      case 'WRONG_CREDENTIALS':
        errorMsg = 'You entered the wrong credentials. Please try logging in again.';
        break;
    }
    return throwError(errorMsg);
  }
}
