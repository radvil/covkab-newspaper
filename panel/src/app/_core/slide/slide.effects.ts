import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { SlideService } from './slide.service';
import {
  SlideActionTypes,
  LoadSlidesAction,
  LoadSlidesSuccessAction,
  LoadSlidesFailureAction,
  UpdateSlideAction,
  UpdateSlideSuccessAction,
  UpdateSlideFailureAction,
  AddSlideAction,
  AddSlideSuccessAction,
  AddSlideFailureAction,
  DeleteSlideAction,
  DeleteSlideSuccessAction,
  DeleteSlideFailureAction,
} from './slide.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class SlideEffects {
  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private slideService: SlideService,
    private router: Router
  ) {}

  @Effect() loadSlides$ = this.actions$.pipe(
    ofType<LoadSlidesAction>(SlideActionTypes.LOAD_SLIDES),
    mergeMap(() =>
      this.slideService.getSlides().pipe(
        map((result) => new LoadSlidesSuccessAction(result)),
        catchError((error) => of(new LoadSlidesFailureAction(error)))
      )
    )
  );

  @Effect() updateSlide$ = this.actions$.pipe(
    ofType<UpdateSlideAction>(SlideActionTypes.UPDATE_SLIDE),
    mergeMap((data) =>
      this.slideService.updateSlide(data.id, data.slide).pipe(
        map((result) => new UpdateSlideSuccessAction(result)),
        tap(() => {
          this.router.navigate(['slides-list/']);
          this.snackBar.open('Updated!', 'close', { duration: 2000 })
        }),
        catchError((error) => {
          this.snackBar.open('Failed to Update!', 'close', { duration: 2000 });
          return of(new UpdateSlideFailureAction(error));
        })
      )
    )
  );

  @Effect() addSlide$ = this.actions$.pipe(
    ofType<AddSlideAction>(SlideActionTypes.ADD_SLIDE),
    mergeMap((data) => {
      return this.slideService.createSlide(data.payload).pipe(
        map((result) => new AddSlideSuccessAction(result)),
        tap(() => {
          this.router.navigate(['slides-list/']);
          this.snackBar.open('Created!', 'close', { duration: 2000 });
        }),
        catchError((err) => {
          this.snackBar.open('Failed to Create!', 'close', { duration: 2000 });
          return of(new AddSlideFailureAction(err));
        })
      );
    })
  );

  @Effect() deleteSlide$ = this.actions$.pipe(
    ofType<DeleteSlideAction>(SlideActionTypes.DELETE_SLIDE),
    mergeMap((data) => {
      return this.slideService.deleteSlide(data.payload).pipe(
        map(() => new DeleteSlideSuccessAction(data.payload)),
        tap(() => this.snackBar.open('Deleted!', 'close', { duration: 2000 })),
        catchError((err) => {
          this.snackBar.open('Failed to Delete!', 'close', { duration: 2000 });
          return of(new DeleteSlideFailureAction(err));
        })
      );
    }) // end mergeMap
  );
}
