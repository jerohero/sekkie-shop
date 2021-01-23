import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataStorageService} from '../services/data-storage.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../../login/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private dataStorageService: DataStorageService, private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.dataStorageService.user
      .pipe(map((user) => {
        if (user) {
          const isAdmin = user.role === 'ROLE_ADMIN';
          if (isAdmin) {
            return true;
          }
        }
        // User isn't logged in
        if (!localStorage.getItem('token')) {
          this.authService.showLogin.next(true);
        }
        return this.router.createUrlTree(['/']);
      }));
  }
}
