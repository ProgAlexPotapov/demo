import { SettingsState } from './settings.model';
import {
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage,
  actionSettingsChangeFontSize,
  actionSettingsChangeTheme,
  actionSettingsCatalogMode
} from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'en',
  fontSize: 'normal',
  theme: 'red',
  catalogMode: 'list',
  pageAnimations: true,
  pageAnimationsDisabled: true,
  elementsAnimations: true
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    actionSettingsCatalogMode,
    actionSettingsChangeFontSize,
    actionSettingsChangeAnimationsPage,
    (state, action) => (
      { ...state, ...action }
    )
  ),
  on(
    actionSettingsChangeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimationsDisabled,
      pageAnimations: false
    })
  )
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
