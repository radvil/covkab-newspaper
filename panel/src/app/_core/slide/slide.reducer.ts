import { ISlide } from './slide.interface';
import { SlideAction, SlideActionTypes } from './slide.actions';

export interface SlidesState {
  list: ISlide[];
  loading: Boolean;
  error: Error;
}

const initialSlidesState: SlidesState = {
  list: [],
  loading: false,
  error: undefined,
};

export function SlidesReducer(
  state: SlidesState = initialSlidesState,
  action: SlideAction
) {
  switch (action.type) {
    // LOAD ACTIONS REDUCER
    case SlideActionTypes.LOAD_SLIDES:
      return {
        ...state,
        loading: true,
      };
    case SlideActionTypes.LOAD_SLIDES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case SlideActionTypes.LOAD_SLIDES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE SLIDE ACTIONS REDUCER
    case SlideActionTypes.UPDATE_SLIDE:
      return {
        ...state,
        loading: true,
      };
    case SlideActionTypes.UPDATE_SLIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case SlideActionTypes.UPDATE_SLIDE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD ACTIONS REDUCER
    case SlideActionTypes.ADD_SLIDE:
      return {
        ...state,
        loading: true,
      };
    case SlideActionTypes.ADD_SLIDE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case SlideActionTypes.ADD_SLIDE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE ACTIONS REDUCER
    case SlideActionTypes.DELETE_SLIDE:
      return {
        ...state,
        loading: true,
      };
    case SlideActionTypes.DELETE_SLIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.payload),
      };
    case SlideActionTypes.DELETE_SLIDE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
