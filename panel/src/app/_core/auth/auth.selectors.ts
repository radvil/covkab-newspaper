import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';
import { selectAuthState } from '../core.state';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
