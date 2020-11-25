import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IUser, Role } from '../../_core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  currentUser: IUser;

  constructor(private authSrv: AuthService, private router: Router) {
    this.authSrv.user.subscribe((x) => (this.currentUser = x));
  }

  get isRoot() {
    return this.currentUser && this.currentUser.role === Role.Root;
  }

  logoutUser() {
    this.authSrv.logoutUser();
    this.router.navigate(['login/']);
  }
}
