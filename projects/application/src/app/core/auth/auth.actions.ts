import { createAction, props } from '@ngrx/store';
export const authLogin = createAction('[Auth] Login');
export const authLogout = createAction('[Auth] Logout');
export const authAdmin = createAction('[Auth] User Admin');
export const authNoAdmin = createAction('[Auth] User Not Admin');
