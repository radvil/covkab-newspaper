import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ResidencesService, IResidence } from '../../../_core';
import { IsLoadingService } from '@service-work/is-loading';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-window_dialog',
  templateUrl: './window_dialog.component.html',
  styleUrls: ['./window_dialog.component.scss'],
})
export class WindowDialogComponent implements OnInit, OnDestroy {
  residence: IResidence;
  windowTitle: string;
  private subscription = new Subscription();
  form: FormGroup;

  titleShowMode = 'Detail Kecamatan';
  titleAddMode = 'Tambah Data Kecamatan';
  titleEditMode = 'Edit Data Kecamatan';
  preview: string;

  successMessage = 'Succeed!';
  failMessage = 'Failed!';

  constructor(
    private residenceSrv: ResidencesService,
    private isLoading: IsLoadingService,
    public dialogRef: MatDialogRef<WindowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.data.mode === 'SHOW') this.setToShowMode();
    if (this.data.mode === 'ADD') this.switchAddMode();
    if (this.data.mode === 'EDIT') this.switchEditMode();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadResidence() {
    const http$ = this.residenceSrv.getResidence(this.data.id);
    const newSub = http$.subscribe((res) => {
      this.residence = { ...res };

      if (this.data.mode !== 'ADD') {
        let isNull = 'http://localhost:3000/images/residences/null';

        if (this.residence.image == isNull) {
          this.preview = 'assets/images/intro.jpeg';
        } else {
          this.preview = this.residence.image;
        }
      }

      if (this.data.mode === 'EDIT') {
        this.patchForm();
      }
    });

    this.isLoading.add(newSub);
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      postalCode: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(null),
    });
  }

  patchForm() {
    this.form.patchValue({
      name: this.residence.name,
      postalCode: this.residence.postalCode,
      description: this.residence.description,
      image: this.residence.image,
    });
  }

  setToShowMode() {
    this.data.mode = 'SHOW';
    this.windowTitle = this.titleShowMode;
    this.subscription.add(this.loadResidence());
  }

  switchAddMode() {
    this.data.mode = 'ADD';
    this.windowTitle = this.titleAddMode;
    this.preview = 'assets/images/intro.jpeg';
    this.createForm();
  }

  switchEditMode() {
    this.data.mode = 'EDIT';
    this.windowTitle = this.titleEditMode;
    this.createForm();
    this.subscription.add(this.loadResidence());
  }

  submitForm() {
    if (this.data.mode === 'ADD') {
      const http$ = this.residenceSrv.createResidence(this.form.value);
      this.isLoading.add(
        http$.subscribe(
          (res) => {
            this.dialogRef.close(this.successMessage);
          },
          (err) => {
            this.dialogRef.close(this.failMessage);
          }
        )
      );
    }

    if (this.data.mode === 'EDIT') {
      const http$ = this.residenceSrv.updateResidence(
        this.residence._id,
        this.form.value
      );
      this.isLoading.add(
        http$.subscribe(
          (res) => {
            this.dialogRef.close(this.successMessage);
          },
          (err) => {
            this.dialogRef.close(this.failMessage);
          }
        )
      );
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.residence);
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }
}
