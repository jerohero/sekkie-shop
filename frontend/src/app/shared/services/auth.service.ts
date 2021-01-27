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
        this.handleAuthentication(resData);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.loginUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData);
      }));
  }

  autoLogin() {
    const refreshToken = localStorage.getItem('refresh-token');
    const token = localStorage.getItem('token');
    if (!refreshToken || !token) {
      return;
    }
    this.userAccessService.verifyUser()
      .subscribe((resData) => {
        this.handleAuthentication(resData);
      }, () => {
        this.logout();
      });
  }

  logout(): void {
    this.dataStorageService.user.next(null);
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('token');
  }

  handleAuthentication(resData: AuthResponseData) {
    localStorage.setItem('refresh-token', resData.refreshToken);
    localStorage.setItem('token', resData.token);
    if (!resData.user.id) {
      return this.dataStorageService.user.next(null);
    }
    const user = new User(
      resData.user.id,
      resData.user.email,
      resData.user.name,
      resData.user.role,
      resData.user.address,
      resData.token
    );
    this.dataStorageService.user.next(user);
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