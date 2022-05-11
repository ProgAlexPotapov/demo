import { createSelector } from '@ngrx/store';
import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);
export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);
export const selectSettingsChangeFontSize = createSelector(
  selectSettings,
  (state: SettingsState) => state.fontSize
);
export const selectCatalogMode = createSelector(
  selectSettings,
  settings => settings.catalogMode
);
export const selectTheme = createSelector(
  selectSettings,
  settings => settings.theme
);
export const selectPageAnimations = createSelector(
  selectSettings,
  settings => settings.pageAnimations
);
export const selectElementsAnimations = createSelector(
  selectSettings,
  settings => settings.elementsAnimations
);
