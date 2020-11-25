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
import { editor } from 'src/app/_shared';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  baseUrl = env.apiUrl + 'info/about';
  obj: any;
  form: FormGroup;
  editor = Object.create(editor);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadAbout();
  }

  loadAbout(): void {
    this.http.get(this.baseUrl).subscribe((res) => {
      this.obj = res['doc'];
      console.log(res)

      const { title, content } = this.obj;

      if (!!this.obj) this.form.patchValue({ title, content });
    });
  }

  submitForm() {
    return this.http.put<IResponse>(this.baseUrl, this.form.value).subscribe(
      (res: IResponse) =>
        this.snackBar.open(res['message'], 'close', { duration: 5000 })
      ),
      (err: any) => this.snackBar.open(err, 'close');
  }

  cancelSubmit() {
    this.router.navigate(['/']);
  }
}

export interface IResponse {
  success: boolean;
  message: string;
  doc?: IAbout;
}

export interface IAbout {
  title: string;
  content: string;
}
