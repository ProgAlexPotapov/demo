import { AppState } from '../core.state';
export const Languages = ['en', 'fr', 'de'];
export const Themes = ['orange', 'red', 'blue'];
export const FontSizes = ['normal', 'medium', 'large'];

export interface SettingsState {
  language: string;
  fontSize: string;
  theme: string;
  catalogMode: string;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}

export interface State extends AppState {
  settings: SettingsState;
}
