import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataStorageService} from '../services/data-storage.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {UserAccessService} from '../services/data-access/user-access.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private dataStorageService: DataStorageService, private router: Router, private authService: AuthService,
              private userAccessService: UserAccessService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    if (this.dataStorageService.user.getValue() !== null) {
      if (this.dataStorageService.user.getValue().role === 'ROLE_ADMIN') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
    return new Observable<boolean>((obs) => {
      this.userAccessService.fetchUserProfile().subscribe((resData) => {
        if (resData.user.role === 'ROLE_ADMIN') {
          obs.next(true);
        } else {
          this.authService.showLogin.next(true);
          obs.next(false);
          this.router.navigate(['/']);
        }
      }, () => {
        this.authService.showLogin.next(true);
        obs.next(false);
        this.router.navigate(['/']);
      });
    });
  }
}
