import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  AuthService,
  IUser,
  SlideService,
  ISlide,
  AddSlideAction,
  UpdateSlideAction,
} from '../../../_core';
import { AppState } from '../../../_core/core.state';

@Component({
  selector: 'app-slides_add',
  templateUrl: './slides_add.component.html',
  styleUrls: ['./slides_add.component.scss'],
})
export class SlidesAddComponent implements OnInit {
  pageTitle = 'Portfolios';
  pageSubtitle = 'Tambahkan Portfolio Baru';
  preview: string;
  idParam: string;
  form: FormGroup;
  _author: IUser;
  slide: ISlide;

  loading$: Observable<Boolean>;

  constructor(
    private fb: FormBuilder,
    private slideSrv: SlideService,
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSrv.user.subscribe((x) => (this._author = x));
    this.idParam = this.route.snapshot.params.id;

    this.form = this.fb.group({
      caption: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ]),
      author: new FormControl(this._author._id, [Validators.required]),
      image: new FormControl(null),
      imageAlt: new FormControl('', [Validators.maxLength(255)])
    });

    if (this.idParam) this.setEditMode();
  }

  setEditMode() {
    this.pageSubtitle = 'Update Portofolio Detail';

    this.slideSrv.getSlide(this.idParam).subscribe((res) => {
      this.slide = res;

      this.preview = this.slide.image;

      this.form.removeControl('image');
      this.form.patchValue({
        caption: this.slide.caption,
        author: this.slide.author._id,
        imageAlt: this.slide.imageAlt
      });
    });
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    this.form.disable();

    if (this.idParam) {
      this.loading$ = this.store.select((store) => store.slides.loading);
      this.store.dispatch(new UpdateSlideAction(this.idParam, this.form.value));
    } else {
      this.loading$ = this.store.select((store) => store.slides.loading);
      this.store.dispatch(new AddSlideAction(this.form.value));
    }
  }

  cancelSubmit() {
    this.router.navigate(['slides-list/']);
  }
}
