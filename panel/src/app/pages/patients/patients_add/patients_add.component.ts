// #region !! Imports !!
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

import {
  PatientService,
  IPatient,
  AuthService,
  IUser,
  ResidencesService,
} from '../../../_core';
import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';
import { environment as env } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
// #endregion ## Imports ##

@Component({
  selector: 'app-patients_add',
  templateUrl: './patients_add.component.html',
  styleUrls: ['./patients_add.component.scss'],
})
export class PatientsAddComponent implements OnInit, OnDestroy {
  pageSubtitle: string = 'Tambah pasien baru';
  form: FormGroup;
  preview = 'assets/images/portraits/placeholder.png';
  statusList = ['odp', 'pdp', 'otg', 'positive'];
  residenceList: Array<any>;
  genderList = ['laki-laki', 'perempuan', 'unknown'];
  hasMudik: boolean = false;
  _author: IUser;
  idParam: string;
  patient: IPatient;
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private isLoading: IsLoadingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private patientSrv: PatientService,
    private residentSrv: ResidencesService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.authSrv.user.subscribe((x) => (this._author = x));
    this.idParam = this.route.snapshot.params.id;
    this.createForm();

    this.residentSrv.getResidences().subscribe((x) => {
      let arr = [];
      x.forEach((x) => arr.push(x.name));
      this.residenceList = [...arr];
    });

    // __set edit mode;
    if (this.idParam) this.setEditMode();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      nik: new FormControl('', [Validators.maxLength(16)]),
      status: new FormControl('', [Validators.required]),
      gender: new FormControl('unknown'),
      phone: new FormControl(''),
      residence: new FormControl(''),
      address: new FormControl(''),
      detail: new FormControl(''),
      hasMudik: new FormControl(this.hasMudik),
      author: new FormControl(this._author._id, [Validators.required]),
      patientPhoto: new FormControl(null),
    });
  }

  setEditMode() {
    this.pageSubtitle = 'Edit pasien detail';

    const http$ = this.patientSrv.getPatient(this.idParam);
    const newSub = http$.subscribe((res) => {
      this.patient = res['doc'];

      if (this.patient.photo) {
        this.preview = env.imageUrl + 'patients/' + this.patient.photo;
      }

      // Patch Form's values
      let obj = {};
      for (let k in this.patient) {
        obj[k] = this.patient[k];
      }
      this.form.patchValue(obj);
    });

    this.isLoading.add(newSub);
    this.subscription.add(newSub);
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ patientPhoto: file });
    this.form.get('patientPhoto').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }

  submitForm() {
    this.form.disable();

    if (this.idParam) {
      // if edit mode,
      const http$ = this.patientSrv.updatePatient(
        this.idParam,
        this.form.value
      );
      const newSub = http$.subscribe(
        (res: any) => {
          this.form.enable();
          this.snackBar.open('Updated!', 'close', { duration: 5000 });
          this.router.navigate(['patients-list/']);
        },
        (err) => {
          this.snackBar.open(`Failed! ${err.message}`, 'Close', {
            duration: 5000,
          });
          this.form.enable();
        }
      );

      this.isLoading.add(newSub);
      this.subscription.add(newSub);
    } else {
      // if add mode,
      const http$ = this.patientSrv.createPatient(this.form.value);
      const newSub = http$.subscribe(
        (res: any) => {
          this.snackBar.open('Created!', 'close', { duration: 5000 });
          this.form.enable();
          this.router.navigate(['patients-list/']);
        },
        (err) => {
          this.snackBar.open(`Failed! ${JSON.stringify(err)}`, 'Close', {
            duration: 5000,
          });
          this.form.enable();
        }
      );

      this.isLoading.add(newSub);
      this.subscription.add(newSub);
    }
  }

  deletePatient(id: string) {
    if (!this.idParam) return;

    const dialogRef = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled', 'Close', { duration: 2000 });
      }

      const http$ = this.patientSrv.deletePatient(id);
      const newSub = http$.subscribe(
        (res: any) => {
          this.snackBar.open('Deleted!', 'close', { duration: 5000 });
          this.router.navigate(['patients-list/']);
        },
        (err: any) => {
          this.snackBar.open(`Failed! ${JSON.stringify(err)}`, 'close');
        }
      );

      this.isLoading.add(newSub);
      this.subscription.add(newSub);
    });
  }

  cancelSubmit() {
    this.router.navigate(['patients-list/']);
  }
}
