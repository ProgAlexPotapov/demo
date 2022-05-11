import { AppState } from '../core.state';
export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean | undefined;
}
export interface State extends AppState {
  auth: AuthState;
}
