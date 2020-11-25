import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';

import { AuthService, IUser } from '../../_core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  user: IUser;
  showPassword: boolean = false;
  returnUrl: string;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private isLoading: IsLoadingService,
    public snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authSrv.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      nik: new FormControl('', [Validators.required, Validators.minLength(11)]),
      password: new FormControl('', [Validators.required]),
    });

    // get to previous url || /;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields;
  get f() {
    return this.form.controls;
  }

  submitForm() {
    this.form.disable();
    this.isLoading.add();

    if (this.form.invalid) return;

    this.authSrv
      .loginUser(this.f.nik.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (res) => {
          // this.authSrv.storeData(res.doc.token, res.doc.user);
          this.snackBar.open('Login succeed', 'close', { duration: 5000 });
          this.router.navigate([this.returnUrl]);
          this.isLoading.remove();
        },
        (err) => {
          this.error = err;
          this.snackBar.open('Login failed!', 'close', {
            duration: 5000,
          });
          this.isLoading.remove();
          this.form.enable();
        }
      );
  }

  cancelSubmit() {
    this.router.navigate(['/']);
  }
}
