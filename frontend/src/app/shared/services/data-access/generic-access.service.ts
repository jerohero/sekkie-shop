import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {DataStorageService} from '../data-storage.service';

@Injectable({providedIn: 'root'})
export class GenericAccessService {
  API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {
  }

  sendGET<T>(requestPath: string, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.get<T>(this.API_URL + requestPath, options);
  }

  sendUserSpecificGET<T>(requestPath: string): Observable<T> {
    const options = this.generateUserSpecificOptions();

    return this.http.get<T>(this.API_URL + requestPath, options);
  }

  sendPOST<T>(requestPath: string, body: unknown, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.post<T>(this.API_URL + requestPath, body, options);
  }

  sendUserSpecificPOST<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.post<T>(this.API_URL + requestPath, body, options);
  }

  sendPUT<T>(requestPath: string, body: unknown, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.put<T>(this.API_URL + requestPath, body, options);
  }

  sendUserSpecificPUT<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.put<T>(this.API_URL + requestPath, body, options);
  }

  sendUserSpecificDELETE<T>(requestPath: string): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.delete<T>(this.API_URL + requestPath, options);
  }

  private generateOptions(tokenRequired): { headers: HttpHeaders } {
    const headers = new HttpHeaders();
    const options = { headers };
    // if (tokenRequired && this.dataStorageService.user.value.token !== null) {
    if (tokenRequired) {
      options.headers = options.headers
        .set('Authorization', 'Bearer ' + this.fetchToken())
        .set('Refresh', this.fetchRefreshToken());
    }
    return options;
  }

  private generateUserSpecificOptions(): { headers: HttpHeaders } {
    let authHeader = null;
    const headers = new HttpHeaders();
    const options = { headers };
    if (this.fetchToken() !== null && this.fetchRefreshToken() !== null) {
      authHeader = 'Bearer ' + this.fetchToken();
      options.headers = options.headers
        .set('Authorization', authHeader)
        .set('Refresh', this.fetchRefreshToken())
        .set('User', this.dataStorageService.user.getValue().id);
    }
    return options;
  }

  fetchToken(): string {
    return localStorage.getItem('token');
  }

  fetchRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

}
