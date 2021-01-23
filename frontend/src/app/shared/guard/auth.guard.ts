import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataStorageService} from '../services/data-storage.service';
import {AuthService} from '../../login/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private dataStorageService: DataStorageService, private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const token = localStorage.getItem('token');
    const isAuth = !!token;
    if (isAuth) {
      return true;
    }
    this.authService.showLogin.next(true);
    return this.router.createUrlTree(['/']);
    // return this.dataStorageService.user
    //   .pipe(map((user) => {
    //     const isAuth = !!user;
    //     if (isAuth) {
    //       return true;
    //     }
    //     this.authService.showLogin.next(true);
    //     return this.router.createUrlTree(['/']);
    //   }));
  }
}
