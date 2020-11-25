import { AuthState } from './auth.model';
import { createReducer, on, Action } from '@ngrx/store';
import { authLogin, authLogout } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state: AuthState) => ({ ...state, isAuthenticated: true })),
  on(authLogout, (state: AuthState) => ({ ...state, isAuthenticated: false }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
