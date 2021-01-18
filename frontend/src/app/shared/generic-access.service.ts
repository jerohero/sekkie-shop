import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../login/auth.service';
import {DataStorageService} from './services/data-storage.service';

@Injectable({providedIn: 'root'})
export class GenericAccessService {
  API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {
  }

  sendGET<T>(requestPath: string, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.get<T>(this.API_URL + requestPath, options);
  }

  sendPOST<T>(requestPath: string, body: unknown, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.post<T>(this.API_URL + requestPath, body, options);
  }

  sendPUT<T>(requestPath: string, body: unknown, tokenRequired: boolean): Observable<T> {
    const options = this.generateOptions(tokenRequired);

    return this.http.put<T>(this.API_URL + requestPath, body, options);
  }

  private generateOptions(tokenRequired): { headers: HttpHeaders } {
    let authHeader = null;
    const headers = new HttpHeaders();
    const options = { headers };
    if (tokenRequired && this.dataStorageService.user.value.token !== null) {
      authHeader = 'Bearer ' + this.fetchToken();
      options.headers = options.headers.set('Authorization', authHeader);
    }
    return options;
  }

  private fetchToken(): string {
    return this.dataStorageService.user.getValue().token;
  }

}
