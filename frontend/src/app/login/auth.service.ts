import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User, UserAddress, UserName} from '../shared/models/user.model';
import {AuthResponseData, UserAccessService} from '../shared/user-access.service';
import {catchError, tap} from 'rxjs/operators';
import {DataStorageService} from '../shared/services/data-storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  showLogin = new Subject<boolean>();

  constructor(private http: HttpClient, private userAccessService: UserAccessService, private dataStorageService: DataStorageService) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.registerUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(
          resData.user.email, resData.user.id, resData.user.name, resData.user.role, resData.user.address, resData.token);

      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.loginUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        console.log(resData);
        this.handleAuthentication(
          resData.user.email, resData.user.id, resData.user.name, resData.user.role, resData.user.address, resData.token);
      }));
  }

  autoLogin() {
    const user: {
      id: string,
      email: string,
      name: UserName,
      role: string,
      address: UserAddress,
      _token: string
    } = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    const loadedUser = new User(user.id, user.email, user.name, user.role, user.address, user._token);

    if (loadedUser.token) {
      this.dataStorageService.user.next(loadedUser);
    }
  }

  logout(): void {
    this.dataStorageService.user.next(null);
    localStorage.removeItem('user');
  }

  handleAuthentication(
    email: string, userId: string, name: UserName, role: string, address: UserAddress, token: string
  ) {
    // const expirationDate = new Date(
    //   new Date().getTime() + +expiresIn * 1000
    // );
    const user = new User(
      userId,
      email,
      name,
      role,
      address,
      token,
      // expirationDate
    );
    this.dataStorageService.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
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
        errorMsg = 'You did not enter a password. Please enter a password.';
        break;
    }
    return throwError(errorMsg);
  }
}
