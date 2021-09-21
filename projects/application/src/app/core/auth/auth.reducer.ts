import { AuthState } from './auth.models';
import { authLogin, authLogout, authAdmin, authNoAdmin } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin: false
};

const reducer = createReducer(
  initialState,
  on(authAdmin, state => ({ ...state, isAdmin: true })),
  on(authNoAdmin, state => ({ ...state, isAdmin: false })),
  on(authLogin, state => ({ ...state, isAuthenticated: true })),
  on(authLogout, state => ({ ...state, isAuthenticated: false, isAdmin: undefined }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
