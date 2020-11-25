import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';
import { Subscription } from 'rxjs';

import { UserService, AuthService, IUser, ResidencesService } from '../../../_core';
import {
  ConfirmDialogComponent,
  ConfirmPasswordValidator,
} from '../../../_shared';

@Component({
  selector: 'app-users_add',
  templateUrl: './users_add.component.html',
  styleUrls: ['./users_add.component.scss'],
})
export class UsersAddComponent implements OnInit, OnDestroy {
  pageTitle = 'Manage Users';
  pageSubtitle = 'Tambah user baru';
  preview = 'assets/images/avatars/placeholder.png';
  roleList = ['admin', 'root'];
  residenceList = [];

  idParam: string;
  user: IUser;
  showPassword: boolean = false;
  isUpdatePassword = false;
  public form: FormGroup;
  public updatePasswordForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService,
    private authSrv: AuthService,
    private residenceSrv: ResidencesService,
    private isLoading: IsLoadingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.idParam = this.route.snapshot.params.id;
    this.createForm();

    this.residenceSrv.getResidences().subscribe((x) => {
      let arr = [];
      x.forEach((x) => arr.push(x.name));
      this.residenceList = [...arr];
    });

    // __set edit mode
    if (this.idParam) this.setUpdateMode();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setUpdateMode() {
    this.pageSubtitle = "Update User's Detail";

    const http$ = this.userSrv.getUser(this.idParam);
    const newSub = http$.subscribe((res) => {
      this.user = res['doc'];

      this.form.removeControl('password');

      this.form.patchValue({
        name: this.user.name,
        nik: this.user.nik,
        phone: this.user.phone,
        role: this.user.role,
        residence: this.user.residence,
        address: this.user.address,
      });

      this.form.updateValueAndValidity();
    });

    this.isLoading.add(newSub);
    this.subscription.add(newSub);
  }

  setUpdatePasswordMode() {
    this.pageSubtitle = 'Update User Password';
    this.isUpdatePassword = true;
    this.updatePasswordForm = this.fb.group(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: ConfirmPasswordValidator.MatchUpdatePassword }
    );
  }

  submitUpdatePassword() {
    this.updatePasswordForm.disable();

    const http$ = this.userSrv.updateUserPassword(
      this.idParam,
      this.updatePasswordForm.value
    );

    const newSub = http$.subscribe(
      (res) => {
        this.updatePasswordForm.enable();
        this.snackBar.open('Updated!', 'close', { duration: 5000 });
        this.isUpdatePassword = false;
      },
      (err) => {
        this.updatePasswordForm.enable();
        this.snackBar.open('Failed!', 'close', { duration: 5000 });
        this.isUpdatePassword = false;
      }
    );

    this.isLoading.add(newSub);
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      nik: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(16),
      ]),
      phone: new FormControl(''),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      residence: new FormControl('', [Validators.required]),
      address: new FormControl(''),
    });
  }

  submitForm() {
    this.form.disable();

    if (this.idParam) {
      // if edit mode,
      const http$ = this.userSrv.updateUser(this.idParam, this.form.value);
      const newSub = http$.subscribe(
        (res: any) => {
          this.form.enable();
          this.snackBar.open('Updated!', 'close', { duration: 5000 });
          this.router.navigate(['users-list/']);
        },
        (err: any) => {
          this.form.enable();
          this.snackBar.open('Failed!', 'close', {
            duration: 5000,
          });
        }
      );

      this.isLoading.add(newSub);
    } else {
      // if add mode,
      const http$ = this.authSrv.registerUser(this.form.value);
      const newSub = http$.subscribe(
        (res: any) => {
          this.form.enable();
          this.snackBar.open('Created!', 'close', { duration: 5000 });
          this.router.navigate(['users-list/']);
        },
        (err: any) => {
          this.form.enable();
          this.snackBar.open('Failed!', 'close', { duration: 5000 });
        }
      );

      this.isLoading.add(newSub);
    }
  }

  cancelSubmit() {
    this.router.navigate(['users-list/']);
  }

  cancelUpdatePassword() {
    this.isUpdatePassword = !this.isUpdatePassword;
    this.pageSubtitle = "Update User's Detail";
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled', 'close', { duration: 2000 });
      }

      const http$ = this.userSrv.deleteUser(id);
      const newSub = http$.subscribe(
        (res: any) => {
          if (res.success) {
            this.snackBar.open('Deleted!', 'close', { duration: 5000 });
            this.router.navigate(['users-list/']);
          }
        },
        (err: any) => {
          this.snackBar.open('Failed!', 'close', { duration: 5000 });
        }
      );

      this.isLoading.add(newSub);
    });
  }
}
