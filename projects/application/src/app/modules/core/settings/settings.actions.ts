import { createAction, props } from '@ngrx/store';

export const actionSettingsChangeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: string }>()
);
export const actionSettingsChangeFontSize = createAction(
  '[Settings] Change Font Size',
  props<{ fontSize: string }>()
);
export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);
export const actionSettingsCatalogMode = createAction(
  '[Settings] Change Catalog Mode',
  props<{ catalogMode: string }>()
);

export const actionSettingsChangeAnimationsPage = createAction(
  '[Settings] Change Animations Page',
  props<{ pageAnimations: boolean }>()
);
export const actionSettingsChangeAnimationsPageDisabled = createAction(
  '[Settings] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>()
);
export const actionSettingsChangeAnimationsElements = createAction(
  '[Settings] Change Animations Elements',
  props<{ elementsAnimations: boolean }>()
);
