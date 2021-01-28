import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorageService} from '../data-storage.service';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GenericAccessService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {
  }

  sendGET<T>(requestPath: string): Observable<T> {
    const options = this.generateOptions();

    return this.http.get<T>(this.API_URL + requestPath, options);
  }

  sendUserSpecificGET<T>(requestPath: string): Observable<T> {
    const options = this.generateUserSpecificOptions();

    return this.http.get<T>(this.API_URL + requestPath, options);
  }

  sendPOST<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateOptions();

    return this.http.post<T>(this.API_URL + requestPath, body, options);
  }

  sendUserSpecificPOST<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.post<T>(this.API_URL + requestPath, body, options);
  }

  sendPUT<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateOptions();

    return this.http.put<T>(this.API_URL + requestPath, body, options);
  }

  sendUserSpecificPUT<T>(requestPath: string, body: unknown): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.put<T>(this.API_URL + requestPath, body, options);
  }

  sendDELETE<T>(requestPath: string): Observable<T> {
    const options = this.generateOptions();
    return this.http.delete<T>(this.API_URL + requestPath, options);
  }

  sendUserSpecificDELETE<T>(requestPath: string): Observable<T> {
    const options = this.generateUserSpecificOptions();
    return this.http.delete<T>(this.API_URL + requestPath, options);
  }

  private generateOptions(): { headers: HttpHeaders; withCredentials: boolean } {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return { headers, withCredentials: true };
  }

  private generateUserSpecificOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers, withCredentials: true };
    if (this.dataStorageService.user.getValue().id) {
      options.headers = options.headers
        .set('User', this.dataStorageService.user.getValue().id);
    }
    return options;
  }

  // fetchToken(): string {
  //   return localStorage.getItem('token');
  // }
  //
  // fetchRefreshToken(): string {
  //   return localStorage.getItem('refresh-token');
  // }
}
