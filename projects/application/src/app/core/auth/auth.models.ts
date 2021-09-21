import { AppState } from '../core.module';
export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean | undefined;
}
export interface State extends AppState {
  auth: AuthState;
}
