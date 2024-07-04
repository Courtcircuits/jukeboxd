import { createReducer, on } from '@ngrx/store';
import { login, logout } from './authentication.actions';

export const initialState = false;

export const authenticationReducer = createReducer(
  initialState,
  on(login, (_) => true),
  on(logout, (_) => false),
);
