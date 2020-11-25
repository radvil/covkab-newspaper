import { Action } from '@ngrx/store';

import { ISlide } from './slide.interface';

export enum SlideActionTypes {
  LOAD_SLIDES = '[Slides] Load Slides',
  LOAD_SLIDES_SUCCESS = '[Slides] Load Slides Success',
  LOAD_SLIDES_FAILURE = '[Slides] Load Slides Failure',

  LOAD_SLIDE = '[Slides] Load Slide',
  LOAD_SLIDE_SUCCESS = '[Slides] Load Slide Success',
  LOAD_SLIDE_FAILURE = '[Slides] Load Slide Failure',

  ADD_SLIDE = '[Slides] Add Slide',
  ADD_SLIDE_SUCCESS = '[Slides] Add Slide Success',
  ADD_SLIDE_FAILURE = '[Slides] Add Slide Failure',

  UPDATE_SLIDE = '[Slides] Update Slide',
  UPDATE_SLIDE_SUCCESS = '[Slides] Update Slide Success',
  UPDATE_SLIDE_FAILURE = '[Slides] Update Slide Failure',

  DELETE_SLIDE = '[Slides] Delete Slide',
  DELETE_SLIDE_SUCCESS = '[Slides] Delete Slide Success',
  DELETE_SLIDE_FAILURE = '[Slides] Delete Slide Failure',
}

// Load Slides
export class LoadSlidesAction implements Action {
  readonly type = SlideActionTypes.LOAD_SLIDES;
}

export class LoadSlidesSuccessAction implements Action {
  readonly type = SlideActionTypes.LOAD_SLIDES_SUCCESS;
  constructor(public payload: Array<ISlide>) {}
}

export class LoadSlidesFailureAction implements Action {
  readonly type = SlideActionTypes.LOAD_SLIDES_FAILURE;
  constructor(public payload: Error) {}
}

// Update Per Slide
export class UpdateSlideAction implements Action {
  readonly type = SlideActionTypes.UPDATE_SLIDE;
  constructor(public id: string, public slide: ISlide) {}
}

export class UpdateSlideSuccessAction implements Action {
  readonly type = SlideActionTypes.UPDATE_SLIDE_SUCCESS;
  constructor(public payload: ISlide) {}
}

export class UpdateSlideFailureAction implements Action {
  readonly type = SlideActionTypes.UPDATE_SLIDE_FAILURE;
  constructor(public payload: Error) {}
}

// Add Slide
export class AddSlideAction implements Action {
  readonly type = SlideActionTypes.ADD_SLIDE;
  constructor(public payload: ISlide) {}
}

export class AddSlideSuccessAction implements Action {
  readonly type = SlideActionTypes.ADD_SLIDE_SUCCESS;
  constructor(public payload: ISlide) {}
}

export class AddSlideFailureAction implements Action {
  readonly type = SlideActionTypes.ADD_SLIDE_FAILURE;
  constructor(public payload: Error) {}
}

// Delete Slide
export class DeleteSlideAction implements Action {
  readonly type = SlideActionTypes.DELETE_SLIDE;
  constructor(public payload: string) {}
}

export class DeleteSlideSuccessAction implements Action {
  readonly type = SlideActionTypes.DELETE_SLIDE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteSlideFailureAction implements Action {
  readonly type = SlideActionTypes.DELETE_SLIDE_FAILURE;
  constructor(public payload: Error) {}
}

export type SlideAction =
  | LoadSlidesAction
  | LoadSlidesSuccessAction
  | LoadSlidesFailureAction
  | UpdateSlideAction
  | UpdateSlideSuccessAction
  | UpdateSlideFailureAction
  | AddSlideAction
  | AddSlideSuccessAction
  | AddSlideFailureAction
  | DeleteSlideAction
  | DeleteSlideSuccessAction
  | DeleteSlideFailureAction;
