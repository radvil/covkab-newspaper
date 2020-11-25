import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { IsLoadingService } from '@service-work/is-loading';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  baseUrl = env.apiUrl + 'info/contact';
  obj: any;
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loadingSrv: IsLoadingService
  ) {
    this.form = this.fb.group({
      intro: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact() {
    const http$ = this.http.get<IResponse>(this.baseUrl).pipe(
      tap((res) => {
        this.obj = res['doc'];

        const { intro, address, email, phone } = this.obj;

        if (this.obj) this.form.patchValue({ intro, address, email, phone });
      }),
      catchError((err: Error) =>
        of(this.snackBar.open(JSON.stringify(err), 'close'))
      )
    );

    return this.loadingSrv.add(http$.subscribe());
  }

  submitForm() {
    const http$ = this.http.put<IResponse>(this.baseUrl, this.form.value).pipe(
      tap((res) =>
        this.snackBar.open(res['message'], 'close', { duration: 5000 })
      ),
      catchError((err: Error) =>
        of(this.snackBar.open(JSON.stringify(err), 'close'))
      )
    );

    return this.loadingSrv.add(http$);
  }

  cancelSubmit() {
    this.router.navigate(['/']);
  }
}

export interface IResponse {
  success: boolean;
  message: string;
  doc?: any;
}
