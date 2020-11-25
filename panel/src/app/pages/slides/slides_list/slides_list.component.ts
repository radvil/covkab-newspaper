import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ISlide, LoadSlidesAction, DeleteSlideAction } from '../../../_core';
import { AppState } from '../../../_core/core.state';
import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';

@Component({
  selector: 'app-slides_list',
  templateUrl: './slides_list.component.html',
  styleUrls: ['./slides_list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlidesListComponent implements OnInit {
  slides$: Observable<Array<ISlide>>;
  error$: Observable<Error>;
  loading$: Observable<Boolean>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select((store) => store.slides.loading);
    this.error$ = this.store.select((store) => store.slides.error);
    this.slides$ = this.store.select((store) => store.slides.list);

    this.store.dispatch(new LoadSlidesAction());
  }

  addSlide() {
    this.router.navigate(['slides-add']);
  }

  editSlide(id: string) {
    this.router.navigate([`slides-edit/${id}`]);
  }

  deleteSlide(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.store.dispatch(new DeleteSlideAction(id));
    });
  }
}
