import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authSrv: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authSrv.userValue;

    if (user) {
      // check if route is restricted by role;
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorized;
        this.router.navigate(['login/']);
        return false;
      }

      // role is authorized;
      return true;
    }

    // not logged in so redirect to login page with the return url;
    this.snackBar.open('Please login first', 'close', { duration: 5000 });
    this.router.navigate(['login/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
