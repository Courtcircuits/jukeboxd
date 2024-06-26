import { createAction } from '@ngrx/store';

export const login = createAction('[Authentication] Login');
export const register = createAction('[Authentication] Register');
export const logout = createAction('[Authentication] Logout');
