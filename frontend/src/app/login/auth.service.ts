import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User} from '../shared/user.model';
import {AuthResponseData, UserAccessService} from '../shared/user-access.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private userAccessService: UserAccessService) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.registerUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.user.email, resData.user.id, resData.token.id);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.userAccessService.loginUser(email, password)
      .pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.user.email, resData.user.id, resData.token.id);
      }));
  }

  handleAuthentication(email: string, userId: string, token: string) {
    // const expirationDate = new Date(
    //   new Date().getTime() + +expiresIn * 1000
    // );
    const user = new User(
      userId,
      email,
      name,
      token,
      // expirationDate
    );
    this.user.next(user);
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
